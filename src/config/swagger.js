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
      url: "/",
      description: "Base URL",
    },
  ],
  components,
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
