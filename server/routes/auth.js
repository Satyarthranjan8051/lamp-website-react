import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
import fs from 'fs-extra'
import path from 'path'

const router = express.Router()

//helper function to read users data
const getUsersData = async () => {
    try{
        const data = await fs.readJSON('./data/users.json')
        return data
    } catch (error) {
        return []
    }
    }

    // helper function to save users data
    const saveUsersData = async (users ) => {
        await fs.writeJSON('./data/users.json', users, { spaces: 2})
    }

    // generate verification token
    const generateVerificationToken = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    // validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // sign up route
    router.post('/signup', async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body

            // validate email format
            if (!isValidEmail(email)) {
                return res.status(400).json({ message: 'Please enter a valid email address' })
            }

            // check if user already exists
            const users = await getUsersData()
            const existingUser = users.find(user => user.email === email)

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' })
            }
            //hash password
            const hashedPassword = await bcrypt.hash(password, 12)

            // create new user
            const newUser = {
                id: uuidv4(),
                firstName,
                lastName,
                email,
                password: hashedPassword,
                emailVerified: false,
                emailVerificationToken: generateVerificationToken(),
                emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                createdAt: new Date().toISOString()
            }

            users.push(newUser)
            await saveUsersData(users)

            // create JWT token
            const token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            )

            res.status(201).json({
                message: 'User created successfully',
                token,
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
                }
            })
        } catch (error) {
            console.error('Signup error:', error)
            res.status(500).json({ message: 'Server error' })
        }
    })

    // sign in route
    router.post('/signin', async (req, res) => {
        try {
            const { email, password } = req.body

            // find user by email
            const users = await getUsersData()
            const user = users.find(user => user.email === email)

            if (!user) {
                return res.status(400).json({message: 'Invalid credentials'})
            }

            // check password
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return res.status(400).json( { message: 'Invalid credentials' })
            }

            // create jwt token
            const token = jwt.sign(
                { userId: user.id, email: user.email},
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            )

            res.json({
                message: 'Sign in successful',
                token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            })
        } catch (error) {
            console.error('Signin error:', error)
            res.status(500).json({ message: 'Server error' })
        }
    })

    // send verification email route
    router.post('/send-verification', async (req, res) => {
        try {
            const { email } = req.body

            const users = await getUsersData()
            const user = users.find(user => user.email === email)

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            if (user.emailVerified) {
                return res.status(400).json({ message: 'Email is already verified' })
            }

            // Generate new verification token
            const verificationToken = generateVerificationToken()
            user.emailVerificationToken = verificationToken
            user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

            await saveUsersData(users)

            // In a real app, you would send this via email service (SendGrid, etc.)
            // For demo purposes, we'll return the token in the response
            res.json({ 
                message: 'Verification email sent successfully',
                verificationToken: verificationToken // Remove this in production
            })

        } catch (error) {
            console.error('Send verification error:', error)
            res.status(500).json({ message: 'Server error' })
        }
    })

    // verify email route
    router.post('/verify-email', async (req, res) => {
        try {
            const { email, token } = req.body

            const users = await getUsersData()
            const userIndex = users.findIndex(user => user.email === email)

            if (userIndex === -1) {
                return res.status(404).json({ message: 'User not found' })
            }

            const user = users[userIndex]

            if (user.emailVerified) {
                return res.status(400).json({ message: 'Email is already verified' })
            }

            if (user.emailVerificationToken !== token) {
                return res.status(400).json({ message: 'Invalid verification token' })
            }

            if (new Date() > new Date(user.emailVerificationExpires)) {
                return res.status(400).json({ message: 'Verification token has expired' })
            }

            // Verify the email
            users[userIndex].emailVerified = true
            users[userIndex].emailVerificationToken = null
            users[userIndex].emailVerificationExpires = null

            await saveUsersData(users)

            res.json({ message: 'Email verified successfully' })

        } catch (error) {
            console.error('Verify email error:', error)
            res.status(500).json({ message: 'Server error' })
        }
    })

    export default router