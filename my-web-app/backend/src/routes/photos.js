const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const authMiddleware = require('../middleware/auth');

// Route to upload a photo
router.post('/upload', authMiddleware, photoController.uploadPhoto);

// Route to get all photos
router.get('/', photoController.getAllPhotos);

// Route to get a specific photo by ID
router.get('/:id', photoController.getPhotoById);

// Route to delete a photo by ID
router.delete('/:id', authMiddleware, photoController.deletePhoto);

module.exports = router;