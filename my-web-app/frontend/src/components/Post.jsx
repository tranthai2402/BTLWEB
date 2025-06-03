import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default Post;