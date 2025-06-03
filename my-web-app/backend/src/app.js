const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép upload ảnh'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// User Model
const User = mongoose.model('User', {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Post Model
const Post = mongoose.model('Post', {
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    email: String
  },
  createdAt: { type: Date, default: Date.now }
});

// Photo Model
const Photo = mongoose.model('Photo', {
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  caption: { type: String, default: '' },
  url: { type: String, required: true },
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    email: String
  },
  createdAt: { type: Date, default: Date.now }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// ĐĂNG KÝ
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'secret-key', { expiresIn: '7d' });

    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ký' });
  }
});

// ĐĂNG NHẬP
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '7d' });

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng nhập' });
  }
});

// TẠO BÀI VIẾT
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Cần đăng nhập để tạo bài viết' });
    }

    let currentUser;
    try {
      const decoded = jwt.verify(token, 'secret-key');
      currentUser = await User.findById(decoded.userId);
      
      if (!currentUser) {
        return res.status(401).json({ message: 'Người dùng không tồn tại' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }

    const post = new Post({
      title,
      content,
      author: {
        id: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
      }
    });

    await post.save();

    res.status(201).json({ 
      message: 'Bài viết đã được tạo thành công', 
      post 
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo bài viết' });
  }
});

// ĐĂNG ẢNH
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  try {
    const { caption } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file ảnh được upload' });
    }

    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Cần đăng nhập để đăng ảnh' });
    }

    let currentUser;
    try {
      const decoded = jwt.verify(token, 'secret-key');
      currentUser = await User.findById(decoded.userId);
      
      if (!currentUser) {
        return res.status(401).json({ message: 'Người dùng không tồn tại' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }

    const photo = new Photo({
      filename: req.file.filename,
      originalName: req.file.originalname,
      caption: caption || '',
      url: `/images/${req.file.filename}`,
      author: {
        id: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
      }
    });

    await photo.save();

    res.status(201).json({ 
      message: 'Ảnh đã được đăng thành công', 
      photo 
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ảnh' });
  }
});

// LẤY TẤT CẢ ẢNH
app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy ảnh' });
  }
});

// LẤY BÀI VIẾT
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy bài viết' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Đăng xuất thành công' });
});

// MongoDB connection
mongoose.connect('mongodb+srv://tranthai:123456_Az@cluster0.bizmmb4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err.message));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});