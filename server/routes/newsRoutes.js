const express = require("express");
const router = express.Router();
const News = require("../models/News");
const upload = require("../middleware/uploadMiddleware");

router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {

    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json({ msg: "Title and Description are required" });
    }

    const newNews = new News({
      title: req.body.title,
      description: req.body.description,

      imagePath: req.file ? req.file.path.replace(/\\/g, "/") : null,
    });

    await newNews.save();
    res.json(newNews);
  } catch (err) {
    console.error("Server Error:", err); 

    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ msg: "News deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

