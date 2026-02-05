const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { httpLogger } = require("./lib/winstonLogger");

const app = express();


// Middleware
app.use(cors({
  origin: "https://cord4-ai-practical-fe.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// Custom Middleware to log request details and execution time
app.use(httpLogger);


// Root route → return index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

// Routes
app.use("/api/image", require("./routes/image.routes"));
app.use("/api/video", require("./routes/video.routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
