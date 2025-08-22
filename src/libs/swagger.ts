import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import { Express } from "express";
import path from "path";

export function swaggerDocs(app: Express) {
    const swaggerPath = path.join(__dirname, "../../swagger.yaml");
    const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8"));

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
