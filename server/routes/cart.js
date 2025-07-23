import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import authenticateToken from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Path to cart data
const CART_DATA_PATH = path.join(__dirname, '../data/carts.json');

// Initialize cart data file if it doesn't exist
const initializeCartData = async () => {
  try {
    await fs.access(CART_DATA_PATH);
  } catch {
    await fs.writeFile(CART_DATA_PATH, JSON.stringify({}));
  }
};

// Load cart data
const loadCartData = async () => {
  try {
    await initializeCartData();
    const data = await fs.readFile(CART_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading cart data:', error);
    return {};
  }
};

// Save cart data
const saveCartData = async (cartData) => {
  try {
    await fs.writeFile(CART_DATA_PATH, JSON.stringify(cartData, null, 2));
  } catch (error) {
    console.error('Error saving cart data:', error);
    throw error;
  }
};

// GET /api/cart - Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartData = await loadCartData();
    const userCart = cartData[req.user.id] || { items: [], updatedAt: new Date().toISOString() };
    
    res.json({
      success: true,
      cart: userCart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart'
    });
  }
});

// POST /api/cart - Sync cart with server
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, clientTimestamp } = req.body;
    
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart items format'
      });
    }

    const cartData = await loadCartData();
    const userId = req.user.id;
    const currentTime = new Date().toISOString();
    
    // Check if server cart is newer than client cart
    const serverCart = cartData[userId];
    if (serverCart && clientTimestamp && new Date(serverCart.updatedAt) > new Date(clientTimestamp)) {
      // Server cart is newer, return server cart
      return res.json({
        success: true,
        cart: serverCart,
        merged: false,
        message: 'Server cart is more recent'
      });
    }
    
    // Client cart is newer or first sync, update server
    cartData[userId] = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        category: item.category || 'lamp'
      })),
      updatedAt: currentTime
    };
    
    await saveCartData(cartData);
    
    res.json({
      success: true,
      cart: cartData[userId],
      merged: true,
      message: 'Cart synced successfully'
    });
  } catch (error) {
    console.error('Error syncing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync cart'
    });
  }
});

// PUT /api/cart/item - Add or update item in cart
router.put('/item', authenticateToken, async (req, res) => {
  try {
    const { productId, product, quantity } = req.body;
    
    if (!productId || !product || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item data'
      });
    }

    const cartData = await loadCartData();
    const userId = req.user.id;
    
    if (!cartData[userId]) {
      cartData[userId] = { items: [], updatedAt: new Date().toISOString() };
    }
    
    const existingItemIndex = cartData[userId].items.findIndex(item => item.id === productId);
    
    if (quantity === 0) {
      // Remove item if quantity is 0
      if (existingItemIndex !== -1) {
        cartData[userId].items.splice(existingItemIndex, 1);
      }
    } else if (existingItemIndex !== -1) {
      // Update existing item
      cartData[userId].items[existingItemIndex].quantity = quantity;
    } else {
      // Add new item
      cartData[userId].items.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category || 'lamp'
      });
    }
    
    cartData[userId].updatedAt = new Date().toISOString();
    await saveCartData(cartData);
    
    res.json({
      success: true,
      cart: cartData[userId],
      message: 'Cart updated successfully'
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item'
    });
  }
});

// DELETE /api/cart/item/:productId - Remove item from cart
router.delete('/item/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cartData = await loadCartData();
    const userId = req.user.id;
    
    if (!cartData[userId]) {
      return res.json({
        success: true,
        cart: { items: [], updatedAt: new Date().toISOString() },
        message: 'Cart is already empty'
      });
    }
    
    cartData[userId].items = cartData[userId].items.filter(item => item.id !== productId);
    cartData[userId].updatedAt = new Date().toISOString();
    
    await saveCartData(cartData);
    
    res.json({
      success: true,
      cart: cartData[userId],
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove cart item'
    });
  }
});

// DELETE /api/cart - Clear entire cart
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const cartData = await loadCartData();
    const userId = req.user.id;
    
    cartData[userId] = {
      items: [],
      updatedAt: new Date().toISOString()
    };
    
    await saveCartData(cartData);
    
    res.json({
      success: true,
      cart: cartData[userId],
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
});

export default router;