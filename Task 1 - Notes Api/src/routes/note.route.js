const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { createNote, getNotes, getNoteById } = require('../controllers/note.controller')
const router = express.Router()

router.post('/', authMiddleware, createNote)
router.get('/', authMiddleware, getNotes)
router.get('/:id', authMiddleware, getNoteById)

module.exports = router