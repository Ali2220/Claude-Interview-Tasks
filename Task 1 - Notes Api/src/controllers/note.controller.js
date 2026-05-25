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

        res.status(201).json({message: 'Note create successfully', note})
    } catch (error) {

    }
}

module.exports = { createNote }