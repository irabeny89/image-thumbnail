import { RequestHandler } from "express";
import { confirmAuth } from "../utils";
import jsonpatch from "jsonpatch";

const validateInputs = async (
  authorization: string | undefined,
  body: { json: object; patch: object }
) =>
  authorization &&
  (await confirmAuth(authorization)) &&
  body?.json &&
  body?.patch &&
  true;

const jsonPatchHandler: RequestHandler = async (
  { body, headers: { authorization } },
  res,
  next
) => {
  try {
    (await validateInputs(authorization, body))
      ? res.status(200).json(jsonpatch.apply_patch(body.json, [body.patch]))
      : res
          .status(400)
          .send(
            "Invalid inputs to a protected route. Validate headers and body of request then try again."
          );
  } catch (error) {
    next(error);
  }
};

export default jsonPatchHandler;
