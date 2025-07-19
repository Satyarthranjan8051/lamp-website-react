import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { user, isAuthenticated } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    })
    const [emailVerification, setEmailVerification] = useState({
        isVerified: false,
        verificationSent: false,
        verificationCode: '',
        enteredCode: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                country: user.country || ''
            })
            // Simulate email verification status
            setEmailVerification(prev => ({
                ...prev,
                isVerified: user.emailVerified || false
            }))
        }
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSaveProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            // In a real app, this would be an API call
            // For now, we'll simulate saving the profile
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            setSuccess('Profile updated successfully!')
            setIsEditing(false)
        } catch (err) {
            setError('Failed to update profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const sendVerificationEmail = async () => {
        setLoading(true)
        try {
            // In a real app, this would send verification email
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Generate a fake verification code for demo
            const code = Math.random().toString(36).substring(2, 8).toUpperCase()
            setEmailVerification(prev => ({
                ...prev,
                verificationSent: true,
                verificationCode: code
            }))
            setSuccess(`Verification email sent! Demo code: ${code}`)
        } catch (err) {
            setError('Failed to send verification email. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const verifyEmail = async () => {
        if (emailVerification.enteredCode === emailVerification.verificationCode) {
            setEmailVerification(prev => ({
                ...prev,
                isVerified: true
            }))
            setSuccess('Email verified successfully!')
            setError('')
        } else {
            setError('Invalid verification code. Please try again.')
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Please Sign In
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        You need to be logged in to view your profile.
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
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Manage your account information and preferences
                    </p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-600 dark:text-green-400">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
                            {/* Avatar */}
                            <div className="w-24 h-24 bg-hero-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {user?.email}
                            </p>

                            {/* Email Verification Status */}
                            <div className="mb-6">
                                {emailVerification.isVerified ? (
                                    <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                                        <i className="ri-shield-check-line"></i>
                                        <span className="text-sm font-medium">Email Verified</span>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
                                            <i className="ri-shield-cross-line"></i>
                                            <span className="text-sm font-medium">Email Not Verified</span>
                                        </div>
                                        {!emailVerification.verificationSent ? (
                                            <button
                                                onClick={sendVerificationEmail}
                                                disabled={loading}
                                                className="w-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/40 transition-colors disabled:opacity-50"
                                            >
                                                {loading ? 'Sending...' : 'Verify Email'}
                                            </button>
                                        ) : (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter verification code"
                                                    value={emailVerification.enteredCode}
                                                    onChange={(e) => setEmailVerification(prev => ({
                                                        ...prev,
                                                        enteredCode: e.target.value.toUpperCase()
                                                    }))}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                                                />
                                                <button
                                                    onClick={verifyEmail}
                                                    className="w-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                                                >
                                                    Verify Code
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Orders</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$379</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Spent</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Personal Information
                                </h3>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-hero-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSaveProfile}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="123 Main Street"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* Zip Code */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                {isEditing && (
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false)
                                                setError('')
                                                setSuccess('')
                                            }}
                                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-3 bg-hero-gradient text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center space-x-2"
                                        >
                                            {loading && (
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
