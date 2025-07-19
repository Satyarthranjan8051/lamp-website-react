import { useState, useEffect } from 'react'
import ApiService from '../services/api'

const NewsletterAdmin = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await ApiService.getNewsletterStats()
      if (response.success) {
        setStats(response.stats)
      } else {
        setError('Failed to fetch newsletter statistics')
      }
    } catch (err) {
      setError('Error loading newsletter statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading newsletter statistics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-5xl text-red-500 mb-4"></i>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={fetchStats}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Newsletter Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor your newsletter subscriptions
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalSubscribers || 0}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <i className="ri-user-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats?.confirmedSubscribers || 0}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                <i className="ri-check-circle-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats?.pendingConfirmation || 0}</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <i className="ri-time-line text-orange-600 dark:text-orange-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats?.activeSubscribers || 0}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                <i className="ri-pulse-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Subscriptions</h2>
          </div>
          <div className="p-6">
            {stats?.recentSubscriptions?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentSubscriptions.map((subscription, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${subscription.isConfirmed ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{subscription.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(subscription.subscribedAt).toLocaleDateString()} at {new Date(subscription.subscribedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {subscription.isConfirmed ? (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <i className="ri-check-circle-line"></i>
                            Confirmed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                            <i className="ri-time-line"></i>
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {Object.entries(subscription.preferences).map(([key, value]) => value && (
                          <span key={key} className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="ri-mail-line text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 dark:text-gray-400">No subscriptions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterAdmin
