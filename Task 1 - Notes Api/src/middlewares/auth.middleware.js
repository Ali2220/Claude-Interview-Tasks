const jwt = require('jsonwebtoken')
const User = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
    try {
        // Header se token lo (example: Bearer exy.....)
        const auth = req.headers.authorization

        if (!auth || !auth.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Token not found' })
        }

        const token = auth.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // DB se user fetch karo aur req mein attach karo
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "User doesn't exists" })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({message: 'Token invalid or expired'})
    }
}

module.exports = authMiddleware