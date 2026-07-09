const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    clickedAt: { type: Date, default: Date.now }
}, { _id: false })

const urlSchema = new mongoose.Schema({

    originalUrl: {
        type: String,
        required: true
    },

    // 'index: true' lagaya hai taake redirection ke waqt search speed super-fast ho
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Clicks: Analytics ke liye counter, jo har click par +1 barhega
    clickHistory: [clickSchema],

    // Expiry Date: Woh time jab yeh link expire hona chahiye
    // Default 'null' hai, yaani jab tak date nahi denge link hamesha zinda rahega
    expiresAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

urlSchema.virtual("totalClicks").get(function () {
    return this.clickHistory.length
})

urlSchema.set('toJSON', { virtuals: true })

// MongoDB TTL (Time-To-Live) Index:
// Jaise hi clock (current time) 'expiresAt' ki date ko cross karegi, 
// MongoDB background mein is pooray record ko automatic database se delete kar dega.
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Url", urlSchema);