const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',    // relationship with the user model
        required: true
    },
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',        // relationship with video model
        required: true
    },
    message:{
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchema)