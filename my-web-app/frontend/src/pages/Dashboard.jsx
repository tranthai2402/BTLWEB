import React, { useState, useEffect } from 'react';
import Blog from '../components/Blog';
import PhotoUpload from '../components/PhotoUpload';
import { createPost, fetchPosts, uploadPhoto } from '../services/api';

const Dashboard = ({ onLogout }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        const getPosts = async () => {
            const allPosts = await fetchPosts();
            setPosts(allPosts);
        };
        getPosts();
    }, []);

    const handlePostChange = (e) => {
        setNewPost(e.target.value);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (newPost) {
            await createPost({ content: newPost });
            setNewPost('');
        }
    };

    return (
        <div>
            <h1>Hi {user.firstName}</h1>
            <button onClick={onLogout}>Logout</button>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={newPost}
                    onChange={handlePostChange}
                    placeholder="Write a new post..."
                />
                <button type="submit">Add Post</button>
            </form>
            <Blog posts={posts} />
            <PhotoUpload />
        </div>
    );
};

export default Dashboard;