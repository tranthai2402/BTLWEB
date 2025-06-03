import React from 'react';

const Navigation = ({ user, onLogout, currentPage, setCurrentPage }) => {
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      onLogout();
    }
  };

  return (
    <nav style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h2>Hi {user.firstName}!</h2>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: currentPage === 'dashboard' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
        
        <button 
          onClick={() => setCurrentPage('addPost')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: currentPage === 'addPost' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add New Post
        </button>
        
        <button 
          onClick={() => setCurrentPage('blog')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: currentPage === 'blog' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Blog
        </button>
        
        <button 
          onClick={() => setCurrentPage('addPhoto')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: currentPage === 'addPhoto' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Photo
        </button>
        
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: '20px'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;