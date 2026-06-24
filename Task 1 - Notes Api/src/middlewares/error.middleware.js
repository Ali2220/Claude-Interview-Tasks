const errorMiddleware = (err, req, res, next) => {

    // 1. Check karo agar MongoDB duplicate key error hai (Code 11000)
    if (err.code === 11000) {
        return res.status(400).json({
            message: "Email already registered"
        })
    }

    // 2. Check karo agar Mongoose ka validation error hai (Rules tootne par)
    if (err.name === "ValidationError") {
        // err.errors ke andar se saare error objects ki values nikaal kar array banaya
        // Phir .map() chala kar har error ka sirf 'message' text nikal kar ek naya array banaya
        const messages = Object.values(err.errors).map((e) => e.message)

        // Saare messages ko comma (, ) se jod kar single string bana kar bhej diya
        return res.status(400).json({
            message: messages.join(', ')
        })
    }

    // 3. Default Error: Agar upar dono se match na ho, toh yeh chalega
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    })
}

module.exports = errorMiddleware