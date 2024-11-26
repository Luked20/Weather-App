// routes/environmentalRoutes.js
const express = require('express');
const router = express.Router();
const { getWeatherData, getForecastData } = require('../services/weatherService');
const { getNaturalDisasters, getFaunaAndFlora, getEnvironmentalData } = require('../services/environmentalService'); // Assumindo que você cria o novo serviço

// Rota para obter dados ambientais (tempo, previsão, desastres naturais, fauna e flora)
router.get('/environment/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params;
    const location = { lat: parseFloat(lat), lon: parseFloat(lon) };
    try {
        const environmentalData = await getEnvironmentalData(location);
        res.json({
            weather: environmentalData.weather,
            forecast: environmentalData.forecast,
            disasters: environmentalData.disasters,
            biodiversity: environmentalData.biodiversity,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
