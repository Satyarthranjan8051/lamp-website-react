import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Home from './components/Home'
import Popular from './components/Popular'
import Choose from './components/Choose'
import Products from './components/Products'
import Join from './components/Join'
import Footer from './components/Footer'
import QuickCart from './components/QuickCart'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import CartSyncIndicator from './components/CartSyncIndicator'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProductsPage from './pages/ProductsPage'
import NewsletterAdmin from './pages/NewsletterAdmin'
import ScrollReveal from 'scrollreveal'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('sunlight-theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }

    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
      reset: true
    })

    sr.reveal('.home__data, .popular__container, .choose__data, .products__container, .join__data, .footer__container')
    sr.reveal('.home__img', { delay: 500 })
    sr.reveal('.home__info div', { delay: 600, interval: 100 })
    sr.reveal('.choose__content .choose__card', { interval: 100 })
    sr.reveal('.products__card', { interval: 100 })

  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    localStorage.setItem('sunlight-theme', newDarkMode ? 'dark' : 'light')
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className={`${darkMode ? 'dark' : ''}`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={
                <>
                  <main className="main">
                    <Home />
                    <Popular />
                    <Choose />
                    <Products />
                    <Join />
                  </main>
                  <Footer />
                  <QuickCart />
                </>
              } />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
            </Routes>
            <CartSyncIndicator />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
