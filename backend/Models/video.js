const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    videoLink:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    category:{
        type: String,
        default: 'All'
    },
    likes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user',
        default: []
    },
    dislikes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user',
        default: []
    },
    
    time:{
        type: String,
        required: true,
        default: '02.25'
    },

}, {timestamps: true})

module.exports = mongoose.model('video', videoSchema)