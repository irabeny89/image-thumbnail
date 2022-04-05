import express from "express";
import authRoutes from "./authRoutes";
import errorHandler from "./errorHandler";
import jsonPatchRoutes from "./jsonPatchRoutes";

// instantiate express server
const server = express();

server.disable("x-powered-by");

// allow json from client; enabling req.body
server.use(express.json());

// headers middleware;
server.use((_, res, next) => {
  // CORS - allow all origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  // allowed HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

// index route
server.get("/", (_, res) => res.status(200).send("api ok"));

// auth routes
server.use("/api", authRoutes);
// json patch routes
server.use("/api", jsonPatchRoutes)
// error handler
server.use(errorHandler);

export default server;
