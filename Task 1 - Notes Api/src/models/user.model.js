const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true  // Yeh kisi bhi email ko save karne se pehle automatically chhote huroof (lowercase) mein convert kar deta hai
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be atleat 6 characters long'],
        select: false  // By default password response mai nhi aye ga.
    }
},
    { timestamps: true }
)

// password ko hash krna save krne se pehle.
// this -> wo user jis ka data save ho rha hai.
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 10)
})


// Password ko Compare karna (Login ke waqt)
// Hum Mongoose schema mein apna ek custom function (method) bana rahe hain jiska naam humne comparePassword rakha hai.
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)