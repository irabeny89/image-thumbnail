import { RequestHandler } from "express";
import { validateInputs } from "../utils";
import jsonpatch from "jsonpatch";
import config from "../../config";

const jsonPatchHandler: RequestHandler = async (
  { body, headers: { authorization } },
  res,
  next
) => {
  try {
    (await validateInputs(authorization, !!body?.json && !!body?.patch))
      ? res.status(200).json(jsonpatch.apply_patch(body.json, [body.patch]))
      : res.status(400).send(config.inputErrorMessage);
  } catch (error) {
    next(error);
  }
};

export default jsonPatchHandler;
