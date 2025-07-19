const API_BASE_URL = 'http://localhost:5000/api'

class ApiService {
  static async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  static async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      return result
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Product related methods
  static getProducts() {
    return this.get('/products')
  }

  static getFeaturedProducts() {
    return this.get('/products/featured')
  }

  static getProduct(id) {
    return this.get(`/products/${id}`)
  }

  // Newsletter subscription
  static subscribeNewsletter(data) {
    // Support both old format (just email) and new format (email + preferences)
    const payload = typeof data === 'string' ? { email: data } : data
    return this.post('/newsletter', payload)
  }

  // Newsletter confirmation
  static confirmNewsletter(token) {
    return this.get(`/newsletter/confirm/${token}`)
  }

  // Newsletter statistics
  static getNewsletterStats() {
    return this.get('/newsletter/stats')
  }

  // Contact form
  static submitContact(contactData) {
    return this.post('/contact', contactData)
  }
}

export default ApiService
