const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the schedule data
app.get('/api/schedule', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading schedule data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
