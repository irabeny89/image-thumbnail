import { ErrorRequestHandler } from "express";
import config from "../../config";

const errorHandler: ErrorRequestHandler = (err, _, res) => {
  res.status(500).send(config.generalErrorMessage)
}

export default errorHandler