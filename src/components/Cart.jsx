import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white dark:bg-gray-800 shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Shopping Cart
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {items.length} item{items.length !== 1 ? 's' : ''} • ${getTotalPrice().toFixed(2)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-4xl text-gray-400 dark:text-gray-500"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Add some amazing lamps to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-hero-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-primary-500 font-semibold">${item.price}</p>
                        <span className="text-xs text-gray-400">× {item.quantity}</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          = ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                        <span className="w-8 text-center text-gray-900 dark:text-white text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        title="Remove item"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-xl font-bold text-primary-500">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-hero-gradient text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
