// Simple test script to check if backend starts correctly
import express from 'express'

const app = express()
const PORT = 5000

app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' })
})

app.listen(PORT, () => {
    console.log(`✅ Test server running on http://localhost:${PORT}`)
    console.log(`📝 Test endpoint: http://localhost:${PORT}/api/test`)
})
