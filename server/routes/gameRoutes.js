const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "Image required" });

    const newGame = new Game({
      title: req.body.title,
      description: req.body.description,
      imagePath: req.file.path.replace(/\\/g, "/"),
    });

    await newGame.save();
    res.json(newGame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ msg: "Game not found" });

    const filePath = path.join(__dirname, "..", game.imagePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Game.findByIdAndDelete(req.params.id);
    res.json({ msg: "Game deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
