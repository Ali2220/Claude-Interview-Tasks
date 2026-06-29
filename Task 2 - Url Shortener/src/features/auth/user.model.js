const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }
}, { timestamps: true })


userSchema.pre("save", async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePassword = async function (candidate) {
    return await bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model("User", userSchema)