import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = ({ darkMode, toggleDarkMode }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrollHeader, setScrollHeader] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const { getTotalItems } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollHeader(scrollY >= 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href) => {
    setActiveLink(href)
    setShowMenu(false)
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Small delay to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
      scrollHeader 
        ? 'bg-white/95 backdrop-blur-3xl shadow-lg dark:bg-gray-900/95' 
        : 'bg-white/90 backdrop-blur-sm dark:bg-gray-900/90'
    }`} id="header">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold text-gray-900 dark:text-white font-secondary">
          SUN<span className="bg-hero-gradient bg-clip-text text-transparent">LIGHT</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {[
              { href: '#home', text: 'Home' },
              { href: '#popular', text: 'Popular' },
              { href: '#choose', text: 'Choose' },
              { href: '#products', text: 'Products' },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-gray-900 dark:text-white hover:text-primary-500 transition-colors ${
                    activeLink === item.href ? 'active-link' : ''
                  }`}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={handleCartClick}
            className="relative text-gray-900 dark:text-white text-xl hover:text-primary-500 transition-colors"
          >
            <i className="ri-shopping-cart-line"></i>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-900 dark:text-white text-xl hover:text-primary-500 transition-colors"
          >
            <i className={darkMode ? 'ri-sun-line' : 'ri-moon-line'}></i>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-900 dark:text-white text-xl md:hidden"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 ${showMenu ? 'right-0' : '-right-full'} w-72 h-full bg-white dark:bg-gray-900 transition-all duration-300 md:hidden z-50 px-6 pt-16`}>
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-4 right-6 text-2xl text-gray-600 dark:text-gray-300"
          >
            <i className="ri-close-line"></i>
          </button>

          <ul className="space-y-6">
            {[
              { href: '#home', text: 'Home' },
              { href: '#popular', text: 'Popular' },
              { href: '#choose', text: 'Choose' },
              { href: '#products', text: 'Products' },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors ${
                    activeLink === item.href ? 'text-primary-500' : ''
                  }`}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
