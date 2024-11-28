// app.js ou server.js
const express = require('express');
const weatherRoutes = require('./routes/weather');
const environmentalRoutes = require('./routes/enviromentalRoutes');  
const app = express();
const port = process.env.PORT || 8080;

// Configuração do middleware
app.use(express.json());  
// Usando as rotas
app.use('/weather', weatherRoutes); 
app.use('/environmental', environmentalRoutes);  


app.get('/', (req, res) => {
    res.send('Welcome to the Weather and Environmental API!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
