import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "API documentation using Swagger",
      },
    },
    apis: ["./src/api/v1/routes/*.ts"], // Adjust path if needed
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
