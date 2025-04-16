const Video = require('../Models/video')
const user = require('../Models/user')

exports.uploadVideo = async (req, res) => {
    try{
        const {title, description, videoLink, category, thumbnail, time} = req.body;
        // creates a new video with logged in users id
        const video = new Video({user: req.user._id, title, description, videoLink, category, thumbnail, time})
        await video.save();
        res.status(201).json({
            success: true,
            video
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.getAllVideo = async (req, res) => {
    try{

        // fetch all the videos 
        const videos = await Video.find().populate('user', 'channelName profilePic email createdAt about')
        console.log(videos)
        res.status(200).json({
            success: true,
            videos
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

// retrieve all videos by a specific user
exports.getAllVideoByUserId = async (req, res) => {
    try{
        let {userId} = req.params;
        //fetch videos uploaded by the specific user
        const video = await Video.find({user: userId}).populate('user', 'channelName profilePic email createdAt about')

        //fetch user details without the password
        const loggedInUser = await user.findById(userId).select('-password');
        res.status(200).json({
            success: true,
            data: video,
            user : loggedInUser
        })
        
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.getVideoById = async (req, res) => {
    try{
        let {videoId} = req.params;
        const video = await Video.findById(videoId).populate('user', 'channelName profilePic email createdAt about')
        res.status(200).json({
            success: true,
            data: video
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.editVideo = async (req, res) =>{
    const {id} = req.params;
    const {title, description, videoLink, category, thumbnail, time} = req.body;

    console.log(id)
    try{
        const video = await Video.findById(id);
        if(!video) {
            return res.status(404).json({msg: "Video not found"})
        }
        // checking if the loggedin user is the owner of the video
        if(video.user.toString() !== req.user._id.toString()){
            return res.status(403).json({msg: "Unauthorized"})
        }

        // updating the video details
        video.title = title || video.title;
        video.description = description || video.description;
        video.videoLink = videoLink || video.videoLink;
        video.category = category || video.category;
        video.thumbnail = thumbnail || video.thumbnail;
        video.time = time || video.time;

        await video.save();
        res.status(200).json({success: true, video})
    }
    catch(err){
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

exports.deleteVideo = async(req, res) =>{
    try{
        const {id} = req.params
        console.log(id)
        const video = await Video.findById(id);
        if(!video){
            return res.status(404).json({msg: "Video not found"})

        }
        // checking authorization so that only owner of the video can delete it
        if(video.user.toString() !== req.user._id.toString()){
            return res.status(403).json({msg: "Unauthorized"})
        }
        await Video.deleteOne({_id: id});
        res.status(200).json({msg: "Video deleted"})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }   
}


// controller for like feature
exports.likeVideo = async (req, res) => {
    try {
        const {id} = req.params;

    //fetching the video
    const video = await Video.findById(id);

    if(!video) {
        return res.status(404).json({success: false, msg: "Video not found"})
    }

    // If the user has already liked the video
    if(video.likes.includes(req.user._id)){
        video.likes = video.likes.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        )
    }  
    else {
        video.likes.push(req.user._id);
        // remove the user from dislike if they previously disliked
        video.dislikes = video.dislikes.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        )
    } 
    await video.save();
    return res.status(200).json({
        success: true,
        msg: "Like updated successfully",
        likes: video.likes.length,
        dislikes: video.dislikes.length,
    })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
    
}



// controller for dislike feature
exports.dislikeVideo = async (req, res) => {
    try {
        const {id} = req.params;
    //fetching the video
    const video = await Video.findById(id);
    if(!video) {
        res.status(404).json({success: false, msg: "Video not found"})
    }

    // If the user has already liked the video
    if(video.dislikes.includes(req.user._id)){
        video.dislikes = video.dislikes.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        )
    }  
    else {
        video.dislikes.push(req.user._id);
        // remove the user from like if they previously liked
        video.likes = video.likes.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        )
    } 
    await video.save();
    res.status(200).json({
        success: true,
        msg: "dislike updated successfully",
        likes: video.likes.length,
        dislikes: video.dislikes.length
    })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }   
}

exports.getVideoReactions = async (req, res) => {
    try {
        const {id} = req.params;

        const video = await Video.findById(id)
    if(!video) {
        return res.status(404).json({
            err: "Video not found"
        })
    }
    res.status(200).json({
        success: true,
        likes: video.likes.length,
        dislikes: video.dislikes.length,
    })
    } catch (error) {
        res.status(500).json({err: error.message});
    }
}