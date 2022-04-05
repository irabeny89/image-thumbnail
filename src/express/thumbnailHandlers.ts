import imageThumbnail from "image-thumbnail";
import { RequestHandler } from "express";
import config from "../../config";
import { validateInputs } from "../utils";

const thumbnailHandler: RequestHandler = async (req, res, next) => {
  try {
    // logically validate request headers & body
    return (await validateInputs(req.headers.authorization, !!req.body?.src))
      ? res.status(200).json({
          thumbnail50x50buffer: await imageThumbnail(
            { uri: req.body.src },
            { height: 50, width: 50, responseType: "buffer" }
          ),
        })
      : res.status(400).send(config.inputErrorMessage);
  } catch (error) {
    next(error);
  }
};

export default thumbnailHandler;
