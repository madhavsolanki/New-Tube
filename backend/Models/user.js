const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    channelName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    profilePic:{
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)