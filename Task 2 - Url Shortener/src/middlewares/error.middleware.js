module.exports = (err, req, res, next) => {
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]
        return res.status(409).json({ message: `${field} already exists` })
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid Token" })
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: 'Token expired' })
    }

    if (err.name === "CastError") {
        return res.status(400).json({ message: 'Invalid ID format' })
    }

    res.status(err.statusCode || 500).json({
        message: err.message || 'Server Error'
    })
}