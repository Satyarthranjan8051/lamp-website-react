import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ensure only one overlay is open at a time
  const openCart = () => {
    setIsCartOpen(true);
    setIsMenuOpen(false);
  };
  const closeCart = () => setIsCartOpen(false);
  const openMenu = () => {
    setIsMenuOpen(true);
    setIsCartOpen(false);
  };
  const closeMenu = () => setIsMenuOpen(false);

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

  const Layout = () => {
    const location = useLocation();
    const hideQuickCart = location.pathname === '/cart' || location.pathname === '/checkout';
    return (
      <div className={`${darkMode ? 'dark' : ''}`}>
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMenuOpen={isMenuOpen}
          openMenu={openMenu}
          closeMenu={closeMenu}
          openCart={openCart}
          isCartOpen={isCartOpen}
          closeCart={closeCart}
        />
        <Outlet />
        <CartSyncIndicator />
        {!hideQuickCart && (
          <QuickCart
            isCartOpen={isCartOpen}
            openCart={openCart}
            closeCart={closeCart}
            openMenu={openMenu}
            isMenuOpen={isMenuOpen}
            closeMenu={closeMenu}
          />
        )}
      </div>
    );
  }

  // Enable React Router v7 startTransition flag to silence warning and prepare for v7
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <>
              <main className="main">
                <Home />
                <Popular />
                <Choose />
                <Products />
                <Join />
              </main>
              <Footer />
            </>
          ),
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "newsletter-admin",
          element: <NewsletterAdmin />,
        },
      ],
    },
  ], {
    future: {
      v7_startTransition: true,
    },
  })

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
