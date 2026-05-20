const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()
connectDB()

app.use(express.json())

module.exports = app