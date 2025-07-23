import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const CartSyncIndicator = () => {
  const { isSyncing, lastSync } = useCart()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isSyncing && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center space-x-2 border">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Syncing cart...
          </span>
        </div>
      )}
      
      {lastSync && !isSyncing && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-green-600 dark:text-green-400">
              Cart synced
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartSyncIndicator
