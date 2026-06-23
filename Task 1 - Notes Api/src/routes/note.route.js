const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/note.controller')
const router = express.Router()

router.post('/', authMiddleware, createNote)
router.get('/', authMiddleware, getNotes)
router.get('/:id', authMiddleware, getNoteById)
router.patch('/:id', authMiddleware, updateNote)
router.delete('/:id', authMiddleware, deleteNote)

module.exports = router