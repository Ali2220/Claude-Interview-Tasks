const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { createNote } = require('../controllers/note.controller')
const router = express.Router()

router.post('/', authMiddleware, createNote)

module.exports = router