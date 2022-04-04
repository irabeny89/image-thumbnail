import { RequestHandler } from "express";
import config from "../../config";
export const loginHandler: RequestHandler = async (
  { body: { username } },
  res,
  next
) => {
  try {
    username
      ? res.json({
          accessToken: (await import("jsonwebtoken")).sign(
            username,
            config.secret
          ),
        })
      : res.status(400).send("Provide username.");
  } catch (error) {
    next(error);
  }
};
