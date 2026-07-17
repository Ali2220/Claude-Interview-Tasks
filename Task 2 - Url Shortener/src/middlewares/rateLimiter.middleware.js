const { rateLimit } = require('express-rate-limit')

exports.shortenLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    // Ye modern rate-limit headers send karta hai. Client ko pata chal sakta hai kitni requests bachi hain, aur reset kab hoga.
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, try again after 1 minute"
})