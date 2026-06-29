const jwt = require("jsonwebtoken")
const userModel = require("../features/auth/user.model")

const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    if (!header?.startsWith("Bearer")) {
        return res.status(401).json({
            message: 'Token not valid'
        })
    }

    try {
        const token = header.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                message: `User doesn't exists`
            })
        }

        req.user = user

        next()
    }
    catch (error) {
        res.status(401).json({
            message: 'Token invalid or expired'
        })
    }

}

module.exports = authMiddleware