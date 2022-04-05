import { RequestHandler } from "express";
import config from "../../config";
const loginHandler: RequestHandler = async (
  { body },
  res,
  next
) => {
  try {
    body?.username
      ? res.json({
          accessToken: (await import("jsonwebtoken")).sign(
            body.username,
            config.secret
          ),
        })
      : res.status(400).send("Provide username.");
  } catch (error) {
    next(error);
  }
}

export default loginHandler