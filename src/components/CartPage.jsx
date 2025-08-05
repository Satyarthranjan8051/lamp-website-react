import { useState } from 'react'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const [toast, setToast] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()


  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      setToast({ type: 'remove', message: 'Item removed from cart.' })
    } else {
      updateQuantity(itemId, newQuantity)
      setToast({ type: 'update', message: 'Quantity updated.' })
    }
  }


  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout')
    }
  }

  const handleRemove = (itemId) => {
    removeFromCart(itemId)
    setToast({ type: 'remove', message: 'Item removed from cart.' })
  }

  const handleClearCart = () => {
    setShowConfirm(true)
  }

  const confirmClearCart = () => {
    clearCart()
    setShowConfirm(false)
    setToast({ type: 'clear', message: 'Cart cleared.' })
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative pt-16 md:pt-20 w-full max-w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300
          ${toast.type === 'remove' ? 'bg-red-500' : toast.type === 'clear' ? 'bg-yellow-500' : 'bg-primary-500'}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}

      {/* Confirm Clear Cart Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Clear Cart?</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Are you sure you want to remove all items from your cart?</p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={confirmClearCart}
                aria-label="Confirm clear cart"
              >
                Yes, clear
              </button>
              <button
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowConfirm(false)}
                aria-label="Cancel clear cart"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="ri-arrow-left-line text-2xl"></i>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {items.length} item{items.length !== 1 ? 's' : ''} in your cart
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-primary-500">${getTotalPrice().toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <i className="ri-shopping-cart-line text-6xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Discover our amazing collection of modern lamps and lighting solutions
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-hero-gradient text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Items in Cart</h2>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-contain rounded-lg border-2 border-primary-100 shadow-sm"
                        />
                        <div className="flex-1 w-full flex flex-col items-center text-center sm:items-start sm:text-left">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                            <p className="text-lg font-semibold text-primary-500">${item.price}</p>
                            <span className="text-sm text-gray-400">× {item.quantity}</span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              = ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-4 mt-4 sm:mt-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 justify-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <i className="ri-subtract-line"></i>
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <i className="ri-add-line"></i>
                            </button>
                          </div>
                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full sm:w-auto"
                            title="Remove item"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 border border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-300 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-semibold shadow-sm"
                  aria-label="Continue shopping"
                >
                  <i className="ri-arrow-left-line mr-2"></i>Continue Shopping
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-6 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 rounded-lg transition-colors font-medium shadow-sm"
                  aria-label="Clear cart"
                >
                  <i className="ri-delete-bin-line mr-2"></i>Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal ({items.length} items)</span>
                      <span className="font-medium text-gray-900 dark:text-white">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="font-medium text-gray-900 dark:text-white">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-primary-500">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className={`w-full bg-hero-gradient text-white py-4 rounded-lg font-medium text-lg mb-4 transition-opacity ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                    disabled={items.length === 0}
                    aria-label="Proceed to checkout"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <i className="ri-shield-check-line text-green-500"></i>
                      Secure checkout
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <i className="ri-truck-line text-blue-500"></i>
                      Free shipping on orders over $50
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <i className="ri-arrow-go-back-line text-purple-500"></i>
                      30-day return policy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage