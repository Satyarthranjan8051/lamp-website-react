import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
// Disable helmet for development to avoid CSP issues
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       connectSrc: ["'self'", "http://localhost:5000", "http://localhost:5173"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       imgSrc: ["'self'", "data:", "https:"],
//     },
//   },
// }))
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// auth routes 
app.use('/api/auth', authRoutes)

// Sample data
const products = [
  {
    id: 1,
    name: "Modern Industrial Lamp",
    category: "Industrial",
    price: 89.99,
    originalPrice: 120.00,
    image: "/src/assets/img/industrial-lamp.png",
    rating: 4.8,
    description: "A sleek industrial-style lamp perfect for modern workspaces",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Ultra Wide Desk Lamp",
    category: "Desk Lamp",
    price: 129.99,
    originalPrice: 160.00,
    image: "/src/assets/img/ultrawide-lamp.png",
    rating: 4.9,
    description: "Wide illumination area perfect for large desks and workstations",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Minimalist Table Lamp",
    category: "Table Lamp",
    price: 69.99,
    originalPrice: 90.00,
    image: "/src/assets/img/modern-lamp.png",
    rating: 4.7,
    description: "Clean, minimalist design that complements any decor",
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "SuperBowl Floor Lamp",
    category: "Floor Lamp",
    price: 199.99,
    originalPrice: 250.00,
    image: "/src/assets/img/superbolw-lamp.png",
    rating: 4.9,
    description: "Statement floor lamp with unique bowl design",
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Stickness Light",
    category: "Desk Lamp",
    price: 45.99,
    originalPrice: 60.00,
    image: "/src/assets/img/stickness-light.png",
    rating: 4.5,
    description: "Compact and portable desk lighting solution",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Roundness Light",
    category: "Ceiling Lamp",
    price: 89.99,
    originalPrice: 110.00,
    image: "/src/assets/img/roundness-light.png",
    rating: 4.6,
    description: "Elegant round ceiling light for ambient illumination",
    inStock: true,
    featured: false
  }
]

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'SunLight API Server',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      featured: '/api/products/featured',
      newsletter: 'POST /api/newsletter'
    }
  })
})

// Favicon route to avoid 404 errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).send()
})

// Get all products
app.get('/api/products', (req, res) => {
  const { category, featured } = req.query
  
  let filteredProducts = products
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(product => product.featured)
  }
  
  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  })
})

// Get single product
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id)
  const product = products.find(p => p.id === productId)
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }
  
  res.json({
    success: true,
    data: product
  })
})

// Get featured products
app.get('/api/products/featured', (req, res) => {
  const featuredProducts = products.filter(product => product.featured)
  
  res.json({
    success: true,
    count: featuredProducts.length,
    data: featuredProducts
  })
})

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    })
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    })
  }
  
  // Here you would typically save to database
  console.log('Newsletter subscription:', email)
  
  res.json({
    success: true,
    message: 'Successfully subscribed to newsletter',
    email: email
  })
})

// Contact form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    })
  }
  
  // Here you would typically save to database or send email
  console.log('Contact form submission:', { name, email, subject, message })
  
  res.json({
    success: true,
    message: 'Contact form submitted successfully'
  })
})

// Checkout/Order endpoint
app.post('/api/checkout', (req, res) => {
  const { customerInfo, items, total } = req.body
  
  if (!customerInfo || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Customer information and items are required'
    })
  }
  
  // Generate order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  // Here you would typically:
  // 1. Process payment
  // 2. Save order to database
  // 3. Send confirmation emails
  // 4. Update inventory
  
  console.log('New order:', {
    orderId,
    customer: customerInfo,
    items,
    total,
    timestamp: new Date().toISOString()
  })
  
  res.json({
    success: true,
    message: 'Order placed successfully',
    orderId,
    estimatedDelivery: '5-7 business days'
  })
})

// Get order status
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params
  
  // Here you would typically fetch from database
  res.json({
    success: true,
    data: {
      orderId,
      status: 'processing',
      estimatedDelivery: '5-7 business days',
      trackingNumber: `TRK${orderId.slice(-8)}`,
      items: []
    }
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 API available at http://localhost:${PORT}`)
})
