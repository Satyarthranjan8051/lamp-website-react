
import React from 'react'

const OrderConfirmation = ({ orderId, checkoutData = {}, items = [], totals = {} }) => {
  const { shipping, delivery } = checkoutData
  const { subtotal = 0, shippingCost = 0, tax = 0, total = 0 } = totals

  // Estimate delivery date
  const getEstimatedDate = () => {
    const now = new Date()
    let days = 5
    if (delivery.method === 'express') days = 2
    if (delivery.method === 'overnight') days = 1
    now.setDate(now.getDate() + days)
    return now.toLocaleDateString()
  }

  return (
    <div className="space-y-8 text-center">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Thank you for your order!</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mx-auto max-w-lg">
        <p className="text-lg font-semibold mb-2">Order ID: <span className="text-orange-600">{orderId}</span></p>
        <p className="mb-2">Estimated Delivery: <span className="font-medium">{getEstimatedDate()}</span></p>
        <p className="mb-4">A confirmation email has been sent to <span className="font-medium">{shipping.email}</span></p>
        <hr className="my-4 border-gray-200 dark:border-gray-600" />
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2 text-left">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-4 border-gray-200 dark:border-gray-600" />
        <div className="space-y-1 text-sm text-left">
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
        <button
          className="mt-8 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          onClick={() => window.location.href = '/'}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmation
