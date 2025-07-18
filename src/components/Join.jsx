import { useState } from 'react'
import ApiService from '../services/api'

const Join = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const response = await ApiService.subscribeNewsletter(email)
      if (response.success) {
        setMessage('Successfully subscribed to newsletter!')
        setEmail('')
      } else {
        setMessage(response.message || 'Subscription failed')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="join">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="join__data">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our <span className="bg-hero-gradient bg-clip-text text-transparent">Newsletter</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals on our premium lighting products.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-hero-gradient text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>

            {message && (
              <div className={`mb-4 p-3 rounded-lg ${
                message.includes('Successfully') 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              }`}>
                {message}
              </div>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-green-500"></i>
                No spam, ever
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-mail-line text-primary-500"></i>
                Weekly updates
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-gift-line text-purple-500"></i>
                Exclusive offers
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="join__img relative">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-third-gradient rounded-full opacity-10"></div>
              <img
                src="/src/assets/img/join-lamp.png"
                alt="Join Newsletter"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Join
