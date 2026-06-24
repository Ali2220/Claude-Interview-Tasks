const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.routes')
const noteRoutes = require('./routes/note.route')
const errorMiddleware = require('./middlewares/error.middleware')

dotenv.config()
connectDB()

app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/note', noteRoutes)

// Global error handler — sabse aakhir mein hona chahiye
app.use(errorMiddleware)

module.exports = app