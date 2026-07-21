const express = require('express')
const app = express()
const connectDB = require('./config/db')
const authRoutes = require('./features/auth/user.route')
const urlRoutes = require('./features/url/url.route')
const errorMiddleware = require('./middlewares/error.middleware')
connectDB()

app.use(express.json())

app.get('/health', (req, res) => res.json({ status: "ok" }))

app.use('/api/auth', authRoutes)
app.use('/api/url', urlRoutes)

app.use(errorMiddleware)

module.exports = app