const express = require('express');
const { createPost, getAllPosts, getUserPosts } = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/posts - Lấy tất cả bài viết (public)
router.get('/', getAllPosts);

// GET /api/posts/my - Lấy bài viết của user hiện tại (private)
router.get('/my', auth, getUserPosts);

// POST /api/posts - Tạo bài viết mới (private)
router.post('/', auth, createPost);

module.exports = router;