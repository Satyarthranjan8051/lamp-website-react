import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { cartApi } from '../services/cartApi'
import { useAuth } from './AuthContext'

const CartContext = createContext()

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_SYNC_STATUS: 'SET_SYNC_STATUS',
  SET_LAST_SYNC: 'SET_LAST_SYNC'
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      }
    }
    
    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload || []
      }
    }
    
    case CART_ACTIONS.SET_SYNC_STATUS: {
      return {
        ...state,
        isSyncing: action.payload
      }
    }
    
    case CART_ACTIONS.SET_LAST_SYNC: {
      return {
        ...state,
        lastSync: action.payload
      }
    }
    
    default:
      return state
  }
}

// Initial state
const initialState = {
  items: [],
  isOpen: false,
  isSyncing: false,
  lastSync: null
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { isAuthenticated, user } = useAuth()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sunlight-cart')
    const lastSync = localStorage.getItem('sunlight-cart-sync')
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart })
        
        if (lastSync) {
          dispatch({ type: CART_ACTIONS.SET_LAST_SYNC, payload: lastSync })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Sync with server when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      syncWithServer()
    }
  }, [isAuthenticated, user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sunlight-cart', JSON.stringify(state.items))
  }, [state.items])

  // Sync cart with server
  const syncWithServer = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      dispatch({ type: CART_ACTIONS.SET_SYNC_STATUS, payload: true })
      
      const clientTimestamp = state.lastSync || new Date().toISOString()
      const response = await cartApi.syncCart(state.items, clientTimestamp)
      
      if (response.success) {
        if (!response.merged && response.cart.items) {
          // Server cart is newer, use server cart
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: response.cart.items })
        }
        
        const syncTime = new Date().toISOString()
        dispatch({ type: CART_ACTIONS.SET_LAST_SYNC, payload: syncTime })
        localStorage.setItem('sunlight-cart-sync', syncTime)
      }
    } catch (error) {
      console.error('Error syncing cart with server:', error)
    } finally {
      dispatch({ type: CART_ACTIONS.SET_SYNC_STATUS, payload: false })
    }
  }, [isAuthenticated, state.items, state.lastSync])

  // Enhanced cart actions with server sync
  const addToCart = useCallback(async (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product })
    
    if (isAuthenticated) {
      try {
        const existingItem = state.items.find(item => item.id === product.id)
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1
        await cartApi.updateCartItem(product.id, product, newQuantity)
      } catch (error) {
        console.error('Error syncing add to cart:', error)
      }
    }
  }, [isAuthenticated, state.items])

  const removeFromCart = useCallback(async (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId })
    
    if (isAuthenticated) {
      try {
        await cartApi.removeCartItem(productId)
      } catch (error) {
        console.error('Error syncing remove from cart:', error)
      }
    }
  }, [isAuthenticated])

  const updateQuantity = useCallback(async (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } })
    
    if (isAuthenticated) {
      try {
        const product = state.items.find(item => item.id === productId)
        if (product) {
          await cartApi.updateCartItem(productId, product, quantity)
        }
      } catch (error) {
        console.error('Error syncing quantity update:', error)
      }
    }
  }, [isAuthenticated, state.items])

  const clearCart = useCallback(async () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
    
    if (isAuthenticated) {
      try {
        await cartApi.clearCart()
      } catch (error) {
        console.error('Error syncing clear cart:', error)
      }
    }
  }, [isAuthenticated])

  // Cart calculations
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const value = {
    items: state.items,
    isSyncing: state.isSyncing,
    lastSync: state.lastSync,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    syncWithServer
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
