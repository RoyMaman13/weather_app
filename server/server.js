const express = require('express');
const cors = require('cors'); // Import the cors package
const config = require('./src/config/config'); // Adjust the path as needed
const weatherRoutes = require('./src/routes/weatherRoutes');

const app = express();

// Use CORS middleware before routes
app.use(cors()); // Enable all CORS requests

// Use the weather routes
app.use('/api', weatherRoutes);

// Start the server
const port = config.port; // Assuming config.port is set to 5001

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
