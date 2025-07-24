
import React, { useState } from 'react'

const ShippingStep = ({ data, onUpdate, onNext }) => {
  const [form, setForm] = useState({
    name: data.name || '',
    address: data.address || '',
    city: data.city || '',
    zip: data.zip || '',
    country: data.country || '',
    phone: data.phone || ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    // Name
    if (!form.name.trim()) newErrors.name = 'Name is required'
    // Email
    if (!form.email || !form.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) newErrors.email = 'Invalid email address'
    }
    // Address
    if (!form.address.trim()) newErrors.address = 'Address is required'
    // City
    if (!form.city.trim()) newErrors.city = 'City is required'
    // ZIP
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required'
    // Country
    if (!form.country.trim()) newErrors.country = 'Country is required'
    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else {
      const phoneRegex = /^[0-9\-\+\s]{7,15}$/
      if (!phoneRegex.test(form.phone)) newErrors.phone = 'Invalid phone number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      onUpdate(form)
      onNext()
    }
  }

  return (
    <form className="space-y-4 max-w-md mx-auto p-4 bg-white dark:bg-gray-900 rounded shadow" onSubmit={handleSubmit} aria-label="Shipping Information">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={`mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${errors.name ? 'border-red-500' : ''}`} aria-invalid={!!errors.name} aria-describedby="name-error" required />
        {errors.name && <span id="name-error" className="text-red-500 text-xs">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input id="email" name="email" type="email" value={form.email || ''} onChange={handleChange} className={`mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`} aria-invalid={!!errors.email} aria-describedby="email-error" required />
        {errors.email && <span id="email-error" className="text-red-500 text-xs">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Address</label>
        <input id="address" name="address" type="text" value={form.address} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500" aria-invalid={!!errors.address} aria-describedby="address-error" required />
        {errors.address && <span id="address-error" className="text-red-500 text-xs">{errors.address}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">City</label>
          <input id="city" name="city" type="text" value={form.city} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500" aria-invalid={!!errors.city} aria-describedby="city-error" required />
          {errors.city && <span id="city-error" className="text-red-500 text-xs">{errors.city}</span>}
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-200">ZIP Code</label>
          <input id="zip" name="zip" type="text" value={form.zip} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500" aria-invalid={!!errors.zip} aria-describedby="zip-error" required />
          {errors.zip && <span id="zip-error" className="text-red-500 text-xs">{errors.zip}</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Country</label>
          <input id="country" name="country" type="text" value={form.country} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500" aria-invalid={!!errors.country} aria-describedby="country-error" required />
          {errors.country && <span id="country-error" className="text-red-500 text-xs">{errors.country}</span>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
        <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={`mt-1 block w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${errors.phone ? 'border-red-500' : ''}`} aria-invalid={!!errors.phone} aria-describedby="phone-error" required />
        {errors.phone && <span id="phone-error" className="text-red-500 text-xs">{errors.phone}</span>}
        </div>
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-orange-600 to-orange-300 text-white font-semibold rounded shadow hover:from-orange-700 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Continue to Payment</button>
    </form>
  )
}

export default ShippingStep