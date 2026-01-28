require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); 

const connectDB = require("./config/db");

const galleryRoutes = require("./routes/galleryRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const newsRoutes = require("./routes/newsRoutes");
const timerRoutes = require("./routes/timerRoutes");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Created "uploads" folder successfully');
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/timer", timerRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

