import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to My Web App</h1>
            <p>This is a simple web application built with React and Node.js.</p>
            <nav>
                <ul>
                    <li><Link to="/login">Login/Register</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/blog">View Blog</Link></li>
                    <li><Link to="/upload">Upload Photo</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;