const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware')
const { shortenUrl, redirectUrl, getMyUrls, deleteUrl } = require('./url.controller')
const { shortenLimiter } = require('../../middlewares/rateLimiter.middleware')

router.post('/shorten', authMiddleware, shortenLimiter, shortenUrl)

// redirect url: without authMiddleware
router.get('/:shortCode', redirectUrl)

router.get('/', authMiddleware, getMyUrls)
router.delete('/:shortCode', authMiddleware, deleteUrl)

module.exports = router;