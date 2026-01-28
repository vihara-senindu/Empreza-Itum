const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
const path = require('path');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Image required' });

    const newSlide = new Slider({
      imagePath: req.file.path.replace(/\\/g, "/"),
      title: req.body.title,
      description: req.body.description
    });

    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const slides = await Slider.find();
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let slide = await Slider.findById(req.params.id);
    if (!slide) return res.status(404).json({ msg: 'Slide not found' });

    const updateData = {
      title: req.body.title || slide.title,
      description: req.body.description || slide.description
    };

    if (req.file) {

      const oldPath = path.join(__dirname, '..', slide.imagePath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      updateData.imagePath = req.file.path.replace(/\\/g, "/");
    }

    slide = await Slider.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(slide);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const slide = await Slider.findById(req.params.id);
    if (!slide) return res.status(404).json({ msg: 'Slide not found' });

    const filePath = path.join(__dirname, '..', slide.imagePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Slider.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Slide deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

