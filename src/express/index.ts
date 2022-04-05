import express from "express";
import authRoutes from "./authRoutes";
import errorHandler from "./errorHandler";
import jsonPatchRoutes from "./jsonPatchRoutes";
import morgan from "morgan"
import headerHandler from "./headerHandler";
import thumbnailRoutes from "./thumbnailRoutes";
// instantiate express server
const server = express();

server.disable("x-powered-by");
// middlewares
// allow json from client; enabling req.body
server.use(express.json());
// logger
server.use(morgan("dev"))
// headers middleware;
server.use(headerHandler);

// index route
server.get("/", (_, res) => res.status(200).send("api ok"));
// auth routes
server.use("/api", authRoutes);
// json patch routes
server.use("/api", jsonPatchRoutes)
// thumbnail routes
server.use("/api", thumbnailRoutes)

// error handler
server.use(errorHandler);

export default server;
