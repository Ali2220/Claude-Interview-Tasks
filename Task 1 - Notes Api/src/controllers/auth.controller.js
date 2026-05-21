/** @type {import('mongoose').Model} */
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' }
    )
}

// POST /api/auth/register
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        // User banao — password model mein automatically hash hoga
        const user = await User.create({
            name,
            email,
            password
        })

        const token = generateToken(user._id)


        res.status(201).json({
            message: 'Registration Successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }

        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// POST /api/auth/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({
            message: 'All field are required'
        })

        // Password bhi saath lao — model mein select:false tha
        const user = await User.findOne({ email }).select("+password")

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                message: 'Email or Password is incorrect'
            })
        }

        const token = generateToken(user._id)

        res.status(200).json({
            message: "Login Successfull",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { register, login }