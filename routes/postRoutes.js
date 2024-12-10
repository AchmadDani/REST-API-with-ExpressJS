const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
// router.post('/', postController.createPost);
router.post('/', authenticate, postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
