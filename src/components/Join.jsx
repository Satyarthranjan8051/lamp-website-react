import { useState, useEffect } from 'react'
import ApiService from '../services/api'

const Join = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    weeklyDeals: true,
    newProducts: true,
    designTips: false,
    homeDecor: false
  })

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
        setIsSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const subscriptionData = {
        email,
        preferences: showPreferences ? preferences : { weeklyDeals: true, newProducts: true }
      }
      
      const response = await ApiService.subscribeNewsletter(subscriptionData)
      if (response.success) {
        setIsSuccess(true)
        setMessage('🎉 Welcome to SunLight! Check your email to confirm your subscription.')
        setEmail('')
        setShowPreferences(false)
      } else {
        setMessage(response.message || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      if (error.message.includes('already subscribed')) {
        setMessage('You\'re already part of our community! 💡')
      } else {
        setMessage('Something went wrong. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden" id="join">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-hero-gradient rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-second-gradient rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-third-gradient rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="join__data">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Join Our <span className="bg-hero-gradient bg-clip-text text-transparent">Newsletter</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals on our premium lighting products.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                      required
                      disabled={loading}
                    />
                    <i className="ri-mail-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-hero-gradient text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 font-medium shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe Now
                        <i className="ri-send-plane-line"></i>
                      </span>
                    )}
                  </button>
                </div>

                {/* Preferences Toggle */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPreferences(!showPreferences)}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                  >
                    <i className={`ri-arrow-${showPreferences ? 'up' : 'down'}-s-line`}></i>
                    Customize your preferences
                  </button>

                  {/* Preferences Panel */}
                  {showPreferences && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3 animate-fade-in border border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                        What would you like to receive?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { key: 'weeklyDeals', label: 'Weekly Deals', icon: 'ri-price-tag-3-line', color: 'text-orange-500 dark:text-orange-400' },
                          { key: 'newProducts', label: 'New Products', icon: 'ri-lightbulb-line', color: 'text-yellow-500 dark:text-yellow-400' },
                          { key: 'designTips', label: 'Design Tips', icon: 'ri-palette-line', color: 'text-purple-500 dark:text-purple-400' },
                          { key: 'homeDecor', label: 'Home Decor', icon: 'ri-home-4-line', color: 'text-green-500 dark:text-green-400' }
                        ].map(({ key, label, icon, color }) => (
                          <label key={key} className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={preferences[key]}
                                onChange={() => handlePreferenceChange(key)}
                                className="sr-only"
                              />
                              <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                                preferences[key] 
                                  ? 'bg-orange-500 border-orange-500' 
                                  : 'border-gray-400 dark:border-gray-500 group-hover:border-orange-400'
                              }`}>
                                {preferences[key] && (
                                  <i className="ri-check-line text-white text-xs absolute top-0 left-0 w-full h-full flex items-center justify-center"></i>
                                )}
                              </div>
                            </div>
                            <i className={`${icon} ${color} text-sm`}></i>
                            <span className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {/* Success/Error Message */}
              {message && (
                <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 animate-slide-up ${
                  isSuccess
                    ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' 
                    : 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <i className={`${isSuccess ? 'ri-check-circle-line text-green-500' : 'ri-information-line text-orange-500'} text-lg mt-0.5`}></i>
                    <div className="flex-1">
                      <p className="font-medium">{message}</p>
                      {isSuccess && (
                        <p className="text-sm mt-1 opacity-80">
                          We'll send you amazing deals and lighting inspiration!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'ri-shield-check-line', title: 'No Spam', desc: 'We respect your inbox', color: 'text-green-500' },
                { icon: 'ri-time-line', title: 'Weekly Updates', desc: 'Fresh content weekly', color: 'text-blue-500' },
                { icon: 'ri-gift-line', title: 'Exclusive Offers', desc: 'Subscriber-only deals', color: 'text-purple-500' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <i className={`${feature.icon} ${feature.color} text-xl`}></i>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{feature.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="join__img relative">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-third-gradient rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-hero-gradient rounded-full opacity-5 animate-spin-slow"></div>
              <img
                src="/img/join-lamp.png"
                alt="Join Newsletter"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating elements */}
              <div className="absolute top-10 left-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-float">
                <i className="ri-notification-line text-orange-500 text-xl"></i>
              </div>
              <div className="absolute bottom-20 right-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-float-delayed">
                <i className="ri-mail-line text-green-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Join
