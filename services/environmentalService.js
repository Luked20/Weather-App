const axios = require('axios');

const { getWeatherData, getForecastData } = require('./weatherService'); 


async function getNaturalDisasters() {
    try {
        const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
            params: {
                format: 'geojson',
                limit: 5, // Limite de desastres mais recentes
                eventtype: 'earthquake', // Tipo de evento
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching natural disasters:', error.response?.data || error.message);
        throw new Error('Failed to fetch natural disaster data');
    }
}

// Função para obter dados sobre fauna e flora (Exemplo com GBIF API)
async function getFaunaAndFlora(location) {
    try {
        // Exemplo usando a GBIF API para dados sobre espécies encontradas em uma região
        const response = await axios.get('https://api.gbif.org/v1/occurrence/search', {
            params: {
                decimalLatitude: location.lat,  // Latitude
                decimalLongitude: location.lon,  // Longitude
                limit: 5,  // Limitar a 5 ocorrências
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching fauna and flora data:', error.response?.data || error.message);
        throw new Error('Failed to fetch fauna and flora data');
    }
}

// Função principal que junta as informações
async function getEnvironmentalData(location) {
    try {
        const weatherData = await getWeatherData(location);
        const forecastData = await getForecastData(location);
        const disasterData = await getNaturalDisasters();
        const faunaAndFloraData = await getFaunaAndFlora(location);

        return {
            weather: weatherData,
            forecast: forecastData,
            disasters: disasterData,
            biodiversity: faunaAndFloraData,
        };
    } catch (error) {
        console.error('Error fetching environmental data:', error.message);
        throw new Error('Failed to fetch complete environmental data');
    }
}

module.exports = { getNaturalDisasters, getFaunaAndFlora, getEnvironmentalData };