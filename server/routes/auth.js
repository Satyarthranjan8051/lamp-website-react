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

    // sign up route
    router.post('/signup', async (req, res) => {
        try {
            const { firstName, lastname, email, password } = req.body

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

    export default router