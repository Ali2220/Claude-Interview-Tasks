const express = require("express");
const app = express()
const connectDB = require("./config/db")

// Connect to MongoDB
connectDB()

module.exports = app