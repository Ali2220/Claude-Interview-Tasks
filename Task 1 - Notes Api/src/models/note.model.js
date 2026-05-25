const { default: mongoose } = require('mongoose');
const mongse = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title max chracters length is 100']
    },
    content: {
        type: String,
        trim: true,
        required: [true, "Content is required"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Note', noteSchema)

 