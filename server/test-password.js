import bcrypt from 'bcryptjs'

// Test what password123 should hash to
const testPassword = 'password123'

bcrypt.hash(testPassword, 12, (err, hash) => {
    if (err) {
        console.error('Error:', err)
        return
    }
    
    console.log('Password:', testPassword)
    console.log('Hash:', hash)
    
    // Test the stored hash
    const storedHash = '$2b$12$MW3di54dkiupquvMfZH2FOaSNn2giYbwbF1lQOVNsFj8g.wCFXLsq'
    
    bcrypt.compare(testPassword, storedHash, (err, result) => {
        if (err) {
            console.error('Compare error:', err)
            return
        }
        
        console.log('Password matches stored hash:', result)
        
        if (!result) {
            console.log('❌ Password does not match! Need to update the user.')
        } else {
            console.log('✅ Password matches! The issue is elsewhere.')
        }
    })
})
