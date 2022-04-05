import { ErrorRequestHandler } from "express";
import config from "../../config";

const errorHandler: ErrorRequestHandler = (err, _, res) => {
  process.env.NODE_ENV !== "production" && console.error(err)
  res.status(500).send(config.generalErrorMessage)
}

export default errorHandler