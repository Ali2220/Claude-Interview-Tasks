/** @type {import('mongoose').Model} */
const Note = require("../models/note.model")

const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and Content both are required' })
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user._id
        })

        res.status(201).json({ message: 'Note create successfully', note })
    } catch (error) {

    }
}

// get notes of a loggedin-user
const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ owner: req.user._id }).sort({ createdAt: -1 })

        return res.status(200).json({ notes })
    } catch (err) {
        res.status(500).json({
            error: `Get Notes Error: ${err.message}`
        })
    }
}

// get single note of a loggedin user
const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            })
        }

        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to access this note"})
        }

        return res.status(400).json({ note })
    } catch (err) {

    }
}

module.exports = { createNote, getNotes, getNoteById }