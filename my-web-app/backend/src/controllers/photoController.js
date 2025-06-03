const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo'); // Assuming a Photo model exists

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

// Route to upload a photo
router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const newPhoto = new Photo({
            filename: req.file.filename,
            path: req.file.path,
            userId: req.user.id // Assuming user ID is available in req.user
        });
        await newPhoto.save();
        res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading photo', error });
    }
});

// Route to get all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error });
    }
});

module.exports = router;