const express = require('express');
const cors = require('cors'); // <-- import cors
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = 8000;

// Enable CORS for all origins (for development)
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/about', (req, res) => {
  res.send({ data: 'About route 2 ' });
});

// // Routes
app.use("/api/image", require("./src/routes/image.routes"));
app.use("/api/video", require("./src/routes/video.routes"));

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
