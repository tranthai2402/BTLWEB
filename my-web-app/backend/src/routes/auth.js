const express = require('express');
const { loginUser, logoutUser, registerUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login - Đăng nhập
router.post('/login', loginUser);

// POST /api/auth/logout - Đăng xuất
router.post('/logout', auth, logoutUser);

// POST /api/auth/register - Đăng ký
router.post('/register', registerUser);

module.exports = router;