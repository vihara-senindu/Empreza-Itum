const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
const path = require('path');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const imagePath = req.file.path.replace(/\\/g, "/"); 

    const newImage = new Gallery({
      imagePath: imagePath,
      caption: req.body.caption
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: 'Image not found' });

    const filePath = path.join(__dirname, '..', image.imagePath);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete local file:", err);

      }
    });

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Image and record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;