const Url = require('./url.model')
const { nanoid } = require('nanoid')

exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias, expiresInDays } = req.body

        if (!originalUrl) {
            return res.status(400).json({
                message: 'Original Url is required'
            })
        }

        try {
            new URL(originalUrl)
        } catch {
            return res.status(400).json({
                message: "Url is not valid"
            })
        }

        const shortCode = customAlias || nanoid(7)

        const existing = await Url.findOne({ shortCode })

        if (existing) {
            return res.status(409).json({
                message: 'Alias is already in use'
            })
        }

        const expiresAt = expiresInDays ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000) : null

        const url = await Url.create({
            originalUrl,
            shortCode,
            owner: req.user._id,
            expiresAt
        })

        res.status(201).json({
            message: 'short url created',
            shortUrl: `${process.env.BASE_URL}/${shortCode}`,
            shortCode,
            originalUrl: url.originalUrl,
            expiresAt: url.expiresAt
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params

        const url = await Url.findOne({ shortCode })

        if (!url) {
            return res.status(404).json({
                message: "Url not found"
            })
        }

        if (url.expiresAt && url.expiresAt < new Date()) {
            return res.status(410).json({
                message: "Url has expired"
            })
        }

        url.clicks += 1
        await url.save()

        // 301 = permanent redirect (browser cache karta hai)
        // 302 = temporary redirect (analytics ke liye better)
        res.redirect(302, url.originalUrl)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}