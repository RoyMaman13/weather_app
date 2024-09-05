const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/weather', weatherController.getWeather);
router.get('/forecastData', weatherController.getforecastWeather);

module.exports = router;
