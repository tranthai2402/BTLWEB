import React, { useState } from 'react';
import Navigation from './Navigation';
import AddPost from './AddPost';
import Blog from './Blog';
import AddPhoto from './AddPhoto';

const Dashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'addPost':
        return <AddPost user={user} />;
      case 'blog':
        return <Blog />;
      case 'addPhoto':
        return <AddPhoto user={user} />;
    }
  };

  return (
    <div>
      <Navigation 
        user={user} 
        onLogout={onLogout} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderContent()}
    </div>
  );
};

export default Dashboard;