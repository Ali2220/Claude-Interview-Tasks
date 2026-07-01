const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware')
const { shortenUrl, redirectUrl } = require('./url.controller')

router.post('/shorten', authMiddleware, shortenUrl)

// redirect url: without authMiddleware
router.get('/:shortCode', redirectUrl)

module.exports = router;