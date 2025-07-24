import React, { useState } from 'react'

const PaymentStep = ({ data = {}, deliveryData = {}, onUpdate, onUpdateDelivery, onNext, onBack }) => {
  const [errors, setErrors] = useState({})

  // Validate payment fields
  const validateForm = () => {
    const newErrors = {}
    if (data.method === 'card') {
      // Card Number: 16 digits, allow spaces
      if (!data.cardNumber?.trim()) {
        newErrors.cardNumber = 'Card number is required'
      } else {
        const cardNum = data.cardNumber.replace(/\s+/g, '')
        if (!/^\d{16}$/.test(cardNum)) newErrors.cardNumber = 'Card number must be 16 digits'
      }
      // Expiry Date: MM/YY format
      if (!data.expiryDate?.trim()) {
        newErrors.expiryDate = 'Expiry date is required'
      } else {
        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(data.expiryDate)) newErrors.expiryDate = 'Invalid format (MM/YY)'
      }
      // CVV: 3 or 4 digits
      if (!data.cvv?.trim()) {
        newErrors.cvv = 'CVV is required'
      } else {
        if (!/^\d{3,4}$/.test(data.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits'
      }
      // Cardholder Name
      if (!data.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleInputChange = (field, value) => {
    if (onUpdate) onUpdate({ [field]: value })
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  // Handle delivery change
  const handleDeliveryChange = (field, value) => {
    if (onUpdateDelivery) onUpdateDelivery({ [field]: value })
  }

  // Handle next button
  const handleNext = (e) => {
    e.preventDefault()
    if (validateForm() && onNext) {
      onNext()
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleNext}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment & Delivery</h2>

      {/* Payment Method Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Payment Method</label>
        <select
          value={data.method || 'card'}
          onChange={e => handleInputChange('method', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Credit Card Fields */}
      {data.method === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number *</label>
            <input
              type="text"
              value={data.cardNumber || ''}
              onChange={e => handleInputChange('cardNumber', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.cardNumber ? 'border-red-500' : ''}`}
              placeholder="1234 5678 9012 3456"
              aria-invalid={!!errors.cardNumber}
              aria-describedby="cardNumber-error"
              maxLength={19}
            />
            {errors.cardNumber && <p id="cardNumber-error" className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date *</label>
            <input
              type="text"
              value={data.expiryDate || ''}
              onChange={e => handleInputChange('expiryDate', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.expiryDate ? 'border-red-500' : ''}`}
              placeholder="MM/YY"
              aria-invalid={!!errors.expiryDate}
              aria-describedby="expiryDate-error"
              maxLength={5}
            />
            {errors.expiryDate && <p id="expiryDate-error" className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVV *</label>
            <input
              type="text"
              value={data.cvv || ''}
              onChange={e => handleInputChange('cvv', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.cvv ? 'border-red-500' : ''}`}
              placeholder="123"
              aria-invalid={!!errors.cvv}
              aria-describedby="cvv-error"
              maxLength={4}
            />
            {errors.cvv && <p id="cvv-error" className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
            <input
              type="text"
              value={data.cardholderName || ''}
              onChange={e => handleInputChange('cardholderName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.cardholderName ? 'border-red-500' : ''}`}
              placeholder="Name on card"
              aria-invalid={!!errors.cardholderName}
              aria-describedby="cardholderName-error"
            />
            {errors.cardholderName && <p id="cardholderName-error" className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
          </div>
        </div>
      )}

      {/* Delivery Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Delivery Method</label>
        <select
          value={deliveryData.method || 'standard'}
          onChange={e => handleDeliveryChange('method', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="standard">Standard (3-5 days)</option>
          <option value="express">Express (1-2 days)</option>
          <option value="overnight">Overnight</option>
        </select>
      </div>

      {/* Delivery Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Delivery Instructions</label>
        <input
          type="text"
          value={deliveryData.instructions || ''}
          onChange={e => handleDeliveryChange('instructions', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="e.g. Leave at front door"
        />
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
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        >
          Continue to Review →
        </button>
      </div>
    </form>
  )
}

export default PaymentStep
