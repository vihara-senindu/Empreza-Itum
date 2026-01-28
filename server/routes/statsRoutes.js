const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');

router.get('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = { eventsCount: "12", teamsCount: "48", leadingTeam: "IT", finalsDate: "Feb 5" };
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (stats) {

      stats.eventsCount = req.body.eventsCount;
      stats.teamsCount = req.body.teamsCount;
      stats.leadingTeam = req.body.leadingTeam;
      stats.finalsDate = req.body.finalsDate;
      await stats.save();
    } else {

      stats = new Stats(req.body);
      await stats.save();
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

