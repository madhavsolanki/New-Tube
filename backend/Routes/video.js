const express = require('express')
const router = express.Router();
const videoController = require('../Controllers/video')

const auth = require('../Middleware/authMiddleware')

router.post('/uploadVideo',auth,videoController.uploadVideo)   // route to upload video only when the user is authenticated
router.get('/allvideo',videoController.getAllVideo)     // get all video from the database
router.get('/getVideoById/:videoId',videoController.getVideoById)   // get the video by Id
router.get('/:userId/channel',videoController.getAllVideoByUserId)  // get all the video by UserId
router.put('/video/:id',auth,videoController.editVideo) // edit the video, only owner of the video can edit
router.delete('/video/:id',auth,videoController.deleteVideo)    //route to delete the video by the owner only
router.post('/video/:id/like',auth,videoController.likeVideo)    //route to like the video by the owner only
router.post('/video/:id/dislike',auth,videoController.dislikeVideo)    //route to dislike the video by the owner only
router.get('/video/:id/reactions',videoController.getVideoReactions)    //route to get the no. of Likes and dislikes video


module.exports = router