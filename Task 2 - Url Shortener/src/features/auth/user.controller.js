const jwt = require('jsonwebtoken')
const userModel = require('./user.model')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

const sendAuthResponse = (res, statusCode, user, token) => {
    res.status(statusCode).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const existing = await userModel.findOne({ email })

        if (existing) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await userModel.create({
            name,
            email,
            password
        })

        const token = signToken(user._id)

        sendAuthResponse(res, 201, user, token)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All field are required"
            })
        }

        const user = await userModel.findOne({ email }).select("+password")

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                message: 'Wrong credentials'
            })
        }

        const token = signToken(user._id)

        sendAuthResponse(res, 200, user, token)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}