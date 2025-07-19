import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignUp = () => {
    const navigate = useNavigate()
    const { signup, loading, error } = useAuth()
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [localError, setLocalError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear errors when user starts typing
        if (localError) setLocalError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLocalError('')

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setLocalError('Please fill in all fields')
            return
        }

        // Name validation
        if (formData.firstName.length < 2) {
            setLocalError('First name must be at least 2 characters')
            return
        }

        if (formData.lastName.length < 2) {
            setLocalError('Last name must be at least 2 characters')
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setLocalError('Please enter a valid email address')
            return
        }

        // Password validation
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters')
            return
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match')
            return
        }

        try {
            const result = await signup(formData.firstName, formData.lastName, formData.email, formData.password)
            
            if (result.success) {
                navigate('/')
            } else {
                setLocalError(result.error)
            }
        } catch (err) {
            setLocalError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-16">
            <div className="max-w-md w-full animate-fade-in">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-down">
                    <div className="mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold bg-hero-gradient bg-clip-text text-transparent leading-tight">
                            Join SunLight
                        </h1>
                        <div className="w-16 h-1 bg-hero-gradient mx-auto mt-4 rounded-full animate-scale-in"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Create your account to start shopping
                    </p>
                </div>

                {/* Sign Up Form */}
                <div className="relative">
                    {/* Decorative background elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-hero-gradient opacity-10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-second-gradient opacity-10 rounded-full blur-xl"></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl 
                                                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                                 dark:bg-gray-700 dark:text-white transition-all duration-200
                                                 placeholder-gray-400 dark:placeholder-gray-500 text-lg
                                                 shadow-sm hover:shadow-md focus:shadow-lg"
                                        placeholder="John"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl 
                                                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                                 dark:bg-gray-700 dark:text-white transition-all duration-200
                                                 placeholder-gray-400 dark:placeholder-gray-500 text-lg
                                                 shadow-sm hover:shadow-md focus:shadow-lg"
                                        placeholder="Doe"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl 
                                             focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                             dark:bg-gray-700 dark:text-white transition-all duration-200
                                             placeholder-gray-400 dark:placeholder-gray-500 text-lg
                                             shadow-sm hover:shadow-md focus:shadow-lg"
                                    placeholder="john@example.com"
                                    disabled={loading}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl 
                                                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                                 dark:bg-gray-700 dark:text-white transition-all duration-200
                                                 placeholder-gray-400 dark:placeholder-gray-500 pr-12 text-lg
                                                 shadow-sm hover:shadow-md focus:shadow-lg"
                                        placeholder="Enter your password"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                                 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                                                 focus:outline-none transition-colors duration-200"
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl 
                                                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                                 dark:bg-gray-700 dark:text-white transition-all duration-200
                                                 placeholder-gray-400 dark:placeholder-gray-500 pr-12 text-lg
                                                 shadow-sm hover:shadow-md focus:shadow-lg"
                                        placeholder="Confirm your password"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                                 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                                                 focus:outline-none transition-colors duration-200"
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {(localError || error) && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                                              rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
                                    {localError || error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-hero-gradient 
                                         hover:opacity-90 hover:scale-[1.02]
                                         text-white font-semibold py-4 px-6 rounded-xl text-lg
                                         transition-all duration-200 transform
                                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                         shadow-lg hover:shadow-xl active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Terms and Conditions */}
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                By creating an account, you agree to our{' '}
                                <Link to="/terms" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Already have an account?{' '}
                                <Link 
                                    to="/signin" 
                                    className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300
                                             font-medium transition-colors duration-200"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
