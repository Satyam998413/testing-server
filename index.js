const express = require('express');
const cors = require('cors'); // <-- import cors

const app = express();
const PORT = 8000;

// Enable CORS for all origins (for development)
app.use(cors());

app.get('/', (req, res) => {
  res.send({ data: 'Hello World' });
});

app.get('/about', (req, res) => {
  res.send({ data: 'About route 🎉 ' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
