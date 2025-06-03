import React, { useState } from 'react';
import axios from 'axios';

const PhotoUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const response = await axios.post('/api/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Photo uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading photo. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Photo</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PhotoUpload;