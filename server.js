const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerConfig');

const express = require('express');
const app = express();

// Importar rutas
// Importar rutas
const remitenteRoutes = require('./routes/remitenteRoutes');
const estadoRoutes = require('./routes/estadoRoutes');
const tipoIncidenciaRoutes = require('./routes/tipoIncidenciaRoutes');
const incidenciaRoutes = require('./routes/incidenciaRoutes');



// Para Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sirviendo archivos estáticos
app.use(express.static('public'));

// Middlewares para parsear el cuerpo de las solicitudes
app.use(express.json());

// Usar rutas
app.use('/api', remitenteRoutes);
app.use('/api', estadoRoutes);
app.use('/api', tipoIncidenciaRoutes);
app.use('/api', incidenciaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);    
});
console.log('**********************************************');
