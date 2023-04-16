const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");
const upload = multer();

router.get('/', postController.readPost); // get all posts
router.post('/', upload.single("file"), postController.createPost); // create a post
router.put('/:id', postController.updatePost); // update a post
router.delete('/:id', postController.deletePost); // delete a post 
router.patch('/like-post/:id', postController.likePost); // like a post 
router.patch('/unlike-post/:id', postController.unlikePost); // unlike a post

// comments
router.patch('/comment-post/:id', postController.commentPost); //   comment on a post
router.patch('/edit-comment-post/:id', postController.editCommentPost); // edit a comment
router.patch('/delete-comment-post/:id', postController.deleteCommentPost); // delete a comment

module.exports = router;