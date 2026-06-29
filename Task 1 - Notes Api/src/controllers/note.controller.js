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
        next(error)
    }
}

// get notes of a loggedin-user
const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ owner: req.user._id }).sort({ createdAt: -1 })

        return res.status(200).json({ notes })
    } catch (error) {
        next(error)
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
            return res.status(403).json({ message: "You are not authorized to access this note" })
        }

        return res.status(200).json({ note })
    } catch (error) {
        next(error)
    }
}

const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }

        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to update this note'
            })
        }

        const { title, content } = req.body

        if (title) {
            note.title = title
        }

        if (content) {
            note.content = content
        }

        await note.save()

        res.status(200).json({ message: "Note updated successfully", note })
    } catch (error) {
        next(error)
    }
}

// Delete Note
const deleteNote = async (req, res, next) => {
    try {

        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }

        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            })
        }

        await note.deleteOne()

        res.status(200).json({
            message: 'Note deleted successfully'
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote }