import express from "express";
import { routes } from "./routes/main";
import { swaggerDocs } from "./libs/swagger";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);

swaggerDocs(server);

server.listen(4000, () => {
    console.log("🚀 Servidor rodando em http://localhost:4000");
});
