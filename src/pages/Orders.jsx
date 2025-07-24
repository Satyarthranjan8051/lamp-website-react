import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import ApiService from '../services/api'

const Orders = () => {
    const { user, isAuthenticated } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all') // all, pending, delivered, cancelled

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders()
        }
    }, [isAuthenticated])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            // Fetch real orders from backend
            const token = localStorage.getItem('authToken')
            const response = await fetch('http://localhost:5000/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            if (result.success && Array.isArray(result.orders)) {
                setOrders(result.orders)
            } else {
                setOrders([])
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
            setOrders([])
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        }
    }

    const filteredOrders = orders.filter(order => 
        filter === 'all' || order.status === filter
    )

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Please Sign In
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        You need to be logged in to view your orders.
                    </p>
                    <Link 
                        to="/signin"
                        className="bg-hero-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-2">
                        My Orders
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Track and manage your SunLight orders
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {[
                        { key: 'all', label: 'All Orders' },
                        { key: 'pending', label: 'Pending' },
                        { key: 'delivered', label: 'Delivered' },
                        { key: 'cancelled', label: 'Cancelled' }
                    ].map((filterOption) => (
                        <button
                            key={filterOption.key}
                            onClick={() => setFilter(filterOption.key)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                filter === filterOption.key
                                    ? 'bg-hero-gradient text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
                            }`}
                        >
                            {filterOption.label}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    /* Orders List */
                    <div className="space-y-6">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No Orders Found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {filter === 'all' 
                                        ? "You haven't placed any orders yet." 
                                        : `No ${filter} orders found.`
                                    }
                                </p>
                                <Link 
                                    to="/"
                                    className="inline-flex items-center bg-hero-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div 
                                    key={order.id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div className="mb-4 md:mb-0">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    Order #{order.id}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Placed on {new Date(order.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                    ${order.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center space-x-4">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        ${item.price}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Details */}
                                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                                        Shipping Address
                                                    </h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {order.shippingAddress}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                                        Tracking Number
                                                    </h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                                                        {order.trackingNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <button className="px-4 py-2 bg-hero-gradient text-white rounded-lg hover:opacity-90 transition-opacity">
                                                Track Order
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                Reorder
                                            </button>
                                            {order.status === 'delivered' && (
                                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    Leave Review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
