const express = require('express');
const cors = require('cors'); // <-- import cors
require("dotenv").config();
const path = require("path");
const { connectDB } = require('./src/config/database');

const conversationRoutes = require('./src/routes/conversations.routes');
const messageRoutes = require('./src/routes/message.routes');
const imageRoutes = require('./src/routes/image.routes');
const videoRoutes = require('./src/routes/video.routes');
const seedDatabase = require('./src/seed/seed');

const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/api/about', (req, res) => {
  res.send({ data: `About route 2 ${process.env.MONGO_URI1}` });
});

// // Routes
app.use("/api/image", imageRoutes);
app.use("/api/video", videoRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT || 8000;

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 
