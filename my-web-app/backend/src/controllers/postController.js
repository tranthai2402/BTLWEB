const Post = require('../models/Post');

// Tạo bài viết mới
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    console.log('Creating post:', { title, content, userId });

    const newPost = new Post({
      title,
      content,
      author: userId
    });

    await newPost.save();
    
    // Populate author info
    await newPost.populate('author', 'firstName lastName email');

    res.status(201).json({
      message: 'Bài viết đã được tạo thành công',
      post: newPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};

// Lấy tất cả bài viết
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};

// Lấy bài viết của user hiện tại
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ author: userId })
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};