const express = require('express');
const router = express.Router();
const Timer = require('../models/Timer');

router.get('/', async (req, res) => {
  try {
    const timer = await Timer.findOne();
    res.json(timer || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {

    const { targetDate, endMessage, isEnabled } = req.body;

    const updatedTimer = await Timer.findOneAndUpdate(
      {}, 
      { targetDate, endMessage, isEnabled }, 

      { upsert: true, new: true }
    );

    res.json(updatedTimer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;