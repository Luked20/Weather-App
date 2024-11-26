// app.js ou server.js
const express = require('express');
const weatherRoutes = require('./routes/weather');
const environmentalRoutes = require('./routes/enviromentalRoutes');  // Importa as novas rotas ambientais
const app = express();
const port = process.env.PORT || 8080;

// Configuração do middleware
app.use(express.json());  // Para processar corpo das requisições JSON

// Usando as rotas
app.use('/weather', weatherRoutes);  // Prefixando as rotas de clima com /weather
app.use('/environmental', environmentalRoutes);  // Prefixando as rotas ambientais com /environmental

// Rota para teste
app.get('/', (req, res) => {
    res.send('Welcome to the Weather and Environmental API!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})