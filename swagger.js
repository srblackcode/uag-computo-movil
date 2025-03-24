const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GoBank API',
      version: '1.0.0',
      description: 'Documentación de la API para GoBank - App bancaria para freelancers',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor local de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // Documentación desde tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
