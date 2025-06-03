import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Đăng ký
export const registerUser = async (firstName, lastName, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    firstName,
    lastName,
    email,
    password
  });
  return response.data;
};

// Đăng nhập
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });
  return response.data;
};

// Đăng xuất
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

// Tạo bài viết
export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

// Lấy tất cả bài viết
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Fetch posts error:', error);
    // Trả về array rỗng nếu lỗi để tránh crash
    return [];
  }
};

// Upload ảnh
export const uploadPhoto = async (formData) => {
  try {
    console.log('Making upload request to:', `${API_URL}/photos`);
    const response = await axios.post(`${API_URL}/photos`, formData, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload photo error:', error);
    throw error;
  }
};