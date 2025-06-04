import swaggerJSDoc from "swagger-jsdoc";

import { components } from "./components.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Personal Budget API",
    version: "1.0.0",
    description: "Documentação da API de Orçamento Pessoal (Personal Budget)",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components,
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
