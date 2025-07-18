import { useCart } from '../context/CartContext'

const QuickCart = () => {
  const { items, getTotalItems, getTotalPrice } = useCart()

  if (getTotalItems() === 0) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center gap-3">
        <div className="bg-primary-500 text-white p-2 rounded-full">
          <i className="ri-shopping-cart-line"></i>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in cart
          </p>
          <p className="text-lg font-bold text-primary-500">
            ${getTotalPrice().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuickCart
