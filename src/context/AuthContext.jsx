import { createContext, useContext, useReducer, useEffect } from "react"
import axios from 'axios'

const AuthContext = createContext()

// auth actions

const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SIGNUP_START: 'SIGNUP_START',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAILURE: 'SIGNUP_FAILURE',
    SET_USER: 'SET_USER'
}

// auth reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
        case AUTH_ACTIONS.SIGNUP_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case AUTH_ACTIONS.LOGIN_SUCCESS:
        case AUTH_ACTIONS.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            }

        case AUTH_ACTIONS.LOGIN_FAILURE:
        case AUTH_ACTIONS.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                token: null,
                error: action.payload
            }
        
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                error: null
            }

        case AUTH_ACTIONS.SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }

        default:
            return state
    }
}

// initial state

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
}

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    // check for token in localStorage on app start
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const user = localStorage.getItem('authUser')

        if (token && user) {
            dispatch({
                type: AUTH_ACTIONS.SET_USER,
                payload: {
                    token,
                    user: JSON.parse(user)
                }
            })
        }
    }, [])

    //login function
    const login = async (email, password) => {
        dispatch({ type: AUTH_ACTIONS.LOGIN_START })

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                email,
                password
            })

            const { token, user } = response.data

            //save to localStorage
            localStorage.setItem('authToken', token)
            localStorage.setItem('authUser', JSON.stringify(user))

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: { token, user }
            })

            return { success: true }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'login failed'
            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: errorMessage
            })
            return { success: false, error: errorMessage }
        }
    }

    // signup function
    const signup = async (firstName, lastName, email, password) => {
        dispatch({ type: AUTH_ACTIONS.SIGNUP_START })

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                firstName,
                lastName,
                email,
                password
            })

            const { token, user } = response.data

            // save to localStorage
            localStorage.setItem('authToken', token)
            localStorage.setItem('authUser', JSON.stringify(user))

            dispatch({
                type: AUTH_ACTIONS.SIGNUP_SUCCESS,
                payload: { token, user }
            })

            return { success: true }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Signup failed'
            dispatch({
                type: AUTH_ACTIONS.SIGNUP_FAILURE,
                payload: errorMessage
            })
            return { success: false, error: errorMessage }
        }
    }

    // logout function
    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
    }
    
    const value = {
        ...state,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}