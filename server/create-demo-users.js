import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs-extra'
import path from 'path'

const createDemoUsers = async () => {
    try {
        // Hash password123
        const hashedPassword = await bcrypt.hash('password123', 12)
        
        const users = [
            {
                "id": "62a94978-45e1-493e-bc52-bcfeae11cc76",
                "firstName": "Abhinav",
                "lastName": "Sharma",
                "email": "test@example.com",
                "password": hashedPassword,
                "createdAt": new Date().toISOString()
            },
            {
                "id": uuidv4(),
                "firstName": "John",
                "lastName": "Doe",
                "email": "john@example.com",
                "password": hashedPassword,
                "createdAt": new Date().toISOString()
            }
        ]
        
        // Write to users.json
        const usersPath = path.join(process.cwd(), 'data', 'users.json')
        await fs.ensureDir(path.dirname(usersPath))
        await fs.writeJSON(usersPath, users, { spaces: 2 })
        
        console.log('✅ Demo users created successfully!')
        console.log('Users:', users.map(u => ({ email: u.email, name: `${u.firstName} ${u.lastName}` })))
        
    } catch (error) {
        console.error('❌ Error creating demo users:', error)
    }
}

createDemoUsers()
