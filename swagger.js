import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000',
  schemes: ["http"]
};

const outputFile = './swagger.json';
const endPointsFiles = ['./src/server.ts'];

swaggerAutogen(outputFile, endPointsFiles, doc);