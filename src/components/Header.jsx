import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Header = ({ darkMode, toggleDarkMode }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrollHeader, setScrollHeader] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { getTotalItems } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollHeader(scrollY >= 50)
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleLinkClick = (href) => {
    setActiveLink(href)
    setShowMenu(false)
    
    // Check if it's the products page link
    if (href === '/products') {
      navigate('/products')
      return
    }
    
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

  const handleSignInClick = () => {
    navigate('/signin')
  }

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setShowUserMenu(false)
  }

  const handleOrdersClick = () => {
    navigate('/orders')
    setShowUserMenu(false)
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
              { href: '/products', text: 'Shop All' },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-gray-900 dark:text-white hover:text-primary-500 transition-colors ${
                    activeLink === item.href ? 'active-link' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(item.href)
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {/* Authentication Buttons (when not logged in) */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={handleSignInClick}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 
                           font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUpClick}
                className="bg-hero-gradient text-white px-4 py-2 rounded-lg font-medium 
                           hover:opacity-90 transition-opacity duration-200"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* User Menu (when logged in) */}
          {isAuthenticated && (
            <div className="relative hidden md:block user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 
                           hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-hero-gradient rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <span className="font-medium">{user?.firstName}</span>
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}></i>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                               border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 
                               hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                               flex items-center space-x-2"
                  >
                    <i className="ri-user-line"></i>
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleOrdersClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 
                               hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                               flex items-center space-x-2"
                  >
                    <i className="ri-shopping-bag-line"></i>
                    <span>Orders</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                                 flex items-center space-x-2"
                    >
                      <i className="ri-logout-box-line"></i>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

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

          {/* User Info (if logged in) */}
          {isAuthenticated && (
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-hero-gradient rounded-full flex items-center justify-center text-white font-medium">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <ul className="space-y-6">
            {[
              { href: '#home', text: 'Home' },
              { href: '#popular', text: 'Popular' },
              { href: '#choose', text: 'Choose' },
              { href: '#products', text: 'Products' },
              { href: '/products', text: 'Shop All' },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors ${
                    activeLink === item.href ? 'text-primary-500' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(item.href)
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}

            {/* Authentication Options */}
            {isAuthenticated ? (
              <>
                <li>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors w-full text-left"
                  >
                    <i className="ri-user-line"></i>
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOrdersClick}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors w-full text-left"
                  >
                    <i className="ri-shopping-bag-line"></i>
                    <span>Orders</span>
                  </button>
                </li>
                <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors w-full text-left"
                  >
                    <i className="ri-logout-box-line"></i>
                    <span>Sign Out</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSignInClick}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors w-full text-left"
                  >
                    <i className="ri-login-box-line"></i>
                    <span>Sign In</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleSignUpClick}
                    className="w-full bg-hero-gradient text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
