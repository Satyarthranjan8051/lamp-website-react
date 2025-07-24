import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../services/api'
import ShippingStep from './checkout/ShippingStep'
import PaymentStep from './checkout/PaymentStep'
import ReviewStep from './checkout/ReviewStep'
import OrderConfirmation from './checkout/OrderConfirmation'

const CHECKOUT_STEPS = {
  SHIPPING: 1,
  PAYMENT: 2,
  REVIEW: 3,
  CONFIRMATION: 4
}

const MultiStepCheckout = ({ cartItems = [], totals = {} }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.SHIPPING)
  const [checkoutData, setCheckoutData] = useState({
    shipping: {},
    payment: {},
    delivery: {}
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Handlers to update data for each step
  const updateShipping = (data) => setCheckoutData(prev => ({ ...prev, shipping: { ...prev.shipping, ...data } }))
  const updatePayment = (data) => setCheckoutData(prev => ({ ...prev, payment: { ...prev.payment, ...data } }))
  const updateDelivery = (data) => setCheckoutData(prev => ({ ...prev, delivery: { ...prev.delivery, ...data } }))

  // Navigation handlers
  const goToNextStep = () => setCurrentStep(prev => prev + 1)
  const goToPreviousStep = () => setCurrentStep(prev => prev - 1)

  // Place order handler
  const [orderError, setOrderError] = useState(null)
  const handlePlaceOrder = async () => {
    setIsLoading(true)
    setOrderError(null)
    try {
      // Prepare order payload
      const payload = {
        customerInfo: {
          name: checkoutData.shipping.name,
          address: checkoutData.shipping.address,
          city: checkoutData.shipping.city,
          zip: checkoutData.shipping.zip,
          country: checkoutData.shipping.country,
          phone: checkoutData.shipping.phone,
          email: checkoutData.shipping.email // add email if available
        },
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totals.total
      }
      const token = localStorage.getItem('authToken')
      const result = await ApiService.post('/checkout', payload, token)
      if (result.orderId) {
        setOrderId(result.orderId)
        setOrderPlaced(true)
        setCurrentStep(CHECKOUT_STEPS.CONFIRMATION)
        // Redirect to orders page after short delay
        setTimeout(() => {
          navigate('/orders')
        }, 1200)
      } else {
        setOrderError(result.message || 'Order failed. Please try again.')
      }
    } catch (error) {
      setOrderError('Order failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Example totals if not provided
  const defaultTotals = {
    subtotal: 100,
    shippingCost: 5.99,
    tax: 8,
    total: 113.99
  }
  const orderTotals = Object.keys(totals).length ? totals : defaultTotals

  return (
    <div>
      {currentStep === CHECKOUT_STEPS.SHIPPING && (
        <ShippingStep
          data={checkoutData.shipping}
          onUpdate={updateShipping}
          onNext={goToNextStep}
        />
      )}
      {currentStep === CHECKOUT_STEPS.PAYMENT && (
        <PaymentStep
          data={checkoutData.payment}
          deliveryData={checkoutData.delivery}
          onUpdate={updatePayment}
          onUpdateDelivery={updateDelivery}
          onNext={goToNextStep}
          onBack={goToPreviousStep}
        />
      )}
      {currentStep === CHECKOUT_STEPS.REVIEW && (
        <ReviewStep
          checkoutData={checkoutData}
          items={cartItems}
          totals={orderTotals}
          onBack={goToPreviousStep}
          onPlaceOrder={handlePlaceOrder}
          isLoading={isLoading}
          orderError={orderError}
        />
      )}
      {currentStep === CHECKOUT_STEPS.CONFIRMATION && orderPlaced && (
        <OrderConfirmation
          orderId={orderId}
          checkoutData={checkoutData}
          items={cartItems}
          totals={orderTotals}
        />
      )}
    </div>
  )
}

export default MultiStepCheckout
