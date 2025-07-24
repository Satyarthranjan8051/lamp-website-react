import React from 'react'

const ReviewStep = ({ checkoutData = {}, items = [], totals = {}, onBack, onPlaceOrder, isLoading, orderError }) => {
  const { shipping, payment, delivery } = checkoutData
  const { subtotal = 0, shippingCost = 0, tax = 0, total = 0 } = totals

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Review Your Order</h2>
      {orderError && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-4">
          <span className="font-semibold">{orderError}</span>
        </div>
      )}

      {/* Shipping Info */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div><span className="font-medium">Name:</span> {shipping.firstName} {shipping.lastName}</div>
          <div><span className="font-medium">Email:</span> {shipping.email}</div>
          <div><span className="font-medium">Phone:</span> {shipping.phone || 'N/A'}</div>
          <div><span className="font-medium">Address:</span> {shipping.address}, {shipping.city}, {shipping.state}, {shipping.zipCode}</div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <div className="text-sm">
          <span className="font-medium">Method:</span> {payment.method === 'card' ? 'Credit Card' : payment.method}
          {payment.method === 'card' && (
            <span> •••• {payment.cardNumber?.slice(-4)}</span>
          )}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Delivery</h3>
        <div className="text-sm">
          <span className="font-medium">Method:</span> {delivery.method || 'Standard'}
          {delivery.instructions && (
            <span className="ml-2">({delivery.instructions})</span>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <img src={item.image} alt={item.name} className="w-8 h-8 rounded" />
                <span>{item.name}</span>
                <span className="text-gray-500">x{item.quantity}</span>
              </div>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-orange-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          className={`bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 flex items-center justify-center ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></span>
          ) : null}
          Place Order
        </button>
      </div>
    </div>
  )
}

export default ReviewStep
