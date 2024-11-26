const express = require('express');
const router = express.Router();
const { getWeatherData, getForecastData, getNaturalDisasters, getFaunaAndFlora, getEnvironmentalData } = require('../services/weatherService');

// Rota para buscar o tempo atual
router.get('/current/:location', async (req, res) => {
    const { location } = req.params;
    try {
        const weatherData = await getWeatherData(location);
        res.json({
            location: weatherData.name,
            temperature: weatherData.main.temp,
            feels_like: weatherData.main.feels_like,
            weather: weatherData.weather[0].description,
            wind_speed: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/forecast/:location', async (req, res) => {
    const { location } = req.params;
    try {
        const forecastData = await getForecastData(location);
        const forecast = forecastData.list.map((entry) => ({
            date: entry.dt_txt,
            temperature: entry.main.temp,
            weather: entry.weather[0].description,
            wind_speed: entry.wind.speed,
        }));
        res.json({ location: forecastData.city.name, forecast });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;