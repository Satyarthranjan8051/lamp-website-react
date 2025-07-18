import { useNavigate } from 'react-router-dom'

const CartPageTest = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Cart Page Test
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default CartPageTest
