const express = require('express');
const router = express.Router();
const About = require('../models/About');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {

    const aboutData = await About.findOne();
    res.json(aboutData || {}); 

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No image uploaded" });

    let aboutData = await About.findOne();

    if (aboutData && aboutData.imagePath) {
      const oldPath = path.join(__dirname, '..', aboutData.imagePath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const newPath = req.file.path.replace(/\\/g, "/");

    if (aboutData) {
      aboutData.imagePath = newPath;
      await aboutData.save();
    } else {
      aboutData = new About({ imagePath: newPath });
      await aboutData.save();
    }

    res.json(aboutData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;