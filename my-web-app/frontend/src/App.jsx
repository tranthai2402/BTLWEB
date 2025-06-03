import React, { useState, useEffect } from 'react';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import { loginUser, registerUser, logoutUser } from './services/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra token khi load app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      alert('Đăng nhập thành công!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Đăng nhập thất bại: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (firstName, lastName, email, password) => {
    try {
      setIsLoading(true);
      const response = await registerUser(firstName, lastName, email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      alert('Đăng ký thành công!');
    } catch (error) {
      console.error('Register error:', error);
      alert('Đăng ký thất bại: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('user'); 
      setUser(null);
      alert('Đăng xuất thành công!');
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn đăng xuất ở client nếu API lỗi
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Sửa từ removeUser thành removeItem
      setUser(null);
    }
  };

  // Nếu đã đăng nhập, hiển thị Dashboard
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Nếu chưa đăng nhập, hiển thị LoginRegister
  return (
    <div style={{ padding: '20px' }}>
      <LoginRegister 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
      />
      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Đang xử lý...
        </div>
      )}
    </div>
  );
};

export default App;