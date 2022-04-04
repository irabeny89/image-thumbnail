import { ErrorRequestHandler } from "express";
import config from "../../config";

const errorHandler: ErrorRequestHandler = async (err, _, res) => {
  console.error(err)
  res.status(500).send(config.generalErrorMessage)
}

export default errorHandler