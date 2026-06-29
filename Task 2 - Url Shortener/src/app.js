const express = require('express')
const app = express()
const connectDB = require('./config/db')
const authRoutes = require('./features/auth/user.route')

connectDB()

app.use(express.json())

app.get('/health', (req, res) => res.json({status: "ok"}))
app.use('/api/auth', authRoutes)

module.exports = app