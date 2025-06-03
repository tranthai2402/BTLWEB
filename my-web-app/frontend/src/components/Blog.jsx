import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      alert('Không thể tải bài viết: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Đang tải bài viết...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Blog - Tất cả bài viết</h2>
      
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          Chưa có bài viết nào. Hãy tạo bài viết đầu tiên!
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <div
              key={post._id || post.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3>{post.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Tác giả: {post.author?.firstName} {post.author?.lastName} | 
                Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
              </p>
              <div style={{ marginTop: '10px', lineHeight: '1.6' }}>
                {post.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;