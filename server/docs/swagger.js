const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const routesPath = path.join(__dirname, '../routes/*.js');
const modelsPath = path.join(__dirname, '../models/*.js');
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'book-app API',
      version: '1.0.0',
      description: 'API Information',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
      { url: 'https://thebooksplace.herokuapp.com' },
    ],
    tags: [
      {
        name: 'Admin',
        description: 'Admin Routes',
      },
      {
        name: 'Users',
        description: 'Users Routes',
      },
      {
        name: 'Auth',
        description: 'Auth Routes',
      },
      {
        name: 'Books',
        description: 'Books Routes',
      },
      {
        name: 'Comments',
        description: 'Book Comments Routes',
      },
    ],
  },
  apis: [routesPath, modelsPath],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
