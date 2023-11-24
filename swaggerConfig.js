const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reclamos y Sugerencias',
      version: '1.0.0',
      description: 'Esta es una API para gestionar reclamos y sugerencias.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // Rutas donde Swagger encontrará tus endpoints
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
