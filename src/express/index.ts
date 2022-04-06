import express from "express";
import authRoutes from "./authRoutes";
import errorHandler from "./errorHandler";
import jsonPatchRoutes from "./jsonPatchRoutes";
import morgan from "morgan"
import headersHandler from "./headersHandler";
import thumbnailRoutes from "./thumbnailRoutes";
// instantiate express server
const server = express();

server.disable("x-powered-by");
// middlewares
// allow json from client; enabling req.body
server.use(express.json());
// logger
server.use(morgan("dev"))
server.use(headersHandler);

// routes
server.get("/", (_, res) => res.status(200).send("api ok"));
server.use("/api", authRoutes);
server.use("/api", jsonPatchRoutes)
server.use("/api", thumbnailRoutes)

server.use(errorHandler);

export default server;
