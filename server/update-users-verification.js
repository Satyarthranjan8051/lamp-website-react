import fs from 'fs-extra'
import path from 'path'

const updateUsersWithEmailVerification = async () => {
    try {
        const usersPath = path.join(process.cwd(), 'data', 'users.json')
        const users = await fs.readJSON(usersPath)
        
        // Add email verification fields to existing users
        const updatedUsers = users.map(user => ({
            ...user,
            emailVerified: user.email === 'test@example.com' || user.email === 'john@example.com', // Demo users are pre-verified
            emailVerificationToken: null,
            emailVerificationExpires: null
        }))
        
        await fs.writeJSON(usersPath, updatedUsers, { spaces: 2 })
        
        console.log('✅ Users updated with email verification fields!')
        console.log(`📧 Updated ${updatedUsers.length} users`)
        
    } catch (error) {
        console.error('❌ Error updating users:', error)
    }
}

updateUsersWithEmailVerification()
