const express = require('express')
const router = express.Router();
const auth = require('../Middleware/authMiddleware')
const commentController = require('../Controllers/comment')

router.post('/Addcomment', auth, commentController.addComment) // add a new comment & requires authentication
router.get('/comment/:videoId',commentController.getCommentByVideoId)   // retrieve conmment by video id
router.put('/comment/:videoId',commentController.editComment)   // edit comment by video id
router.delete('/comment/:videoId',commentController.deleteComment)  // delete comment by video id

module.exports = router;