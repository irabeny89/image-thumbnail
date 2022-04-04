import express from "express";

// instantiate express server
const server = express();

server.disable("x-powered-by");

// allow json from client enabling req.body
server.use(express.json());

// headers middleware; cors- allow all origin
server.all("/", (_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// index route
server.get("/", (_, res) => {
  res.status(200).send("api ok");
});
// TODO
// accounts router
server.use("/api", () => {});

export default server;
