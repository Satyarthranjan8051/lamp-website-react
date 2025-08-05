import { useCart } from '../context/CartContext'

const QuickCart = ({ isCartOpen, openCart, closeCart, openMenu, isMenuOpen, closeMenu }) => {
  const { items, getTotalItems, getTotalPrice } = useCart()

  // Only show the cart overlay if open and there are items
  if (!isCartOpen || getTotalItems() === 0) return null

  return (
    <div
      className="fixed inset-0 z-[1000] md:bottom-4 md:right-4 md:inset-auto bg-black/60 md:bg-transparent flex items-end md:block"
      onClick={closeCart}
      style={{ touchAction: 'manipulation' }}
    >
      <div
        className="w-full md:w-auto bg-white dark:bg-gray-800 p-4 rounded-t-lg md:rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mx-auto md:mx-0"
        style={{ maxWidth: '400px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 text-white p-2 rounded-full">
            <i className="ri-shopping-cart-line"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in cart
            </p>
            <p className="text-lg font-bold text-primary-500">
              ${getTotalPrice().toFixed(2)}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xl"
            aria-label="Close cart"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickCart
