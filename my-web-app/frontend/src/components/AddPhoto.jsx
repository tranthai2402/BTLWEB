import React, { useState } from 'react';
import { uploadPhoto } from '../services/api';

const AddPhoto = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Vui lòng chọn ảnh để đăng!');
      return;
    }

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('caption', caption);
      
      console.log('Uploading photo...', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        caption: caption
      });
      
      await uploadPhoto(formData);
      alert('Ảnh đã được đăng thành công!');
      
      setSelectedFile(null);
      setCaption('');
      setPreview(null);
      document.getElementById('photo-input').value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      if (error.code === 'ERR_NETWORK') {
        alert('Lỗi kết nối: Không thể kết nối tới server');
      } else {
        alert('Lỗi khi đăng ảnh: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Đăng ảnh mới</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Chọn ảnh:
          </label>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              width: '100%'
            }}
          />
        </div>

        {preview && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Mô tả (tùy chọn):
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px',
              resize: 'vertical'
            }}
            placeholder="Thêm mô tả cho ảnh của bạn..."
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          style={{
            padding: '12px 25px',
            backgroundColor: isUploading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: isUploading ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? 'Đang đăng...' : 'Đăng ảnh'}
        </button>
      </form>
    </div>
  );
};

export default AddPhoto;