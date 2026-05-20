const mongoose = require("mongoose")

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