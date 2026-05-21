const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.routes')

dotenv.config()
connectDB()

app.use(express.json())

// routes
app.use('/api/auth', authRoutes)

module.exports = app