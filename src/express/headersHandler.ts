import { RequestHandler } from "express";

const headersHandler: RequestHandler = (_, res, next) => {
  // CORS - allow all origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  // allowed HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH");
  next();
}

export default headersHandler