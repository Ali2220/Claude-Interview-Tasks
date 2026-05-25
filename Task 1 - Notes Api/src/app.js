const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.routes')
const noteRoutes = require('./routes/note.route')

dotenv.config()
connectDB()

app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/note', noteRoutes)

module.exports = app