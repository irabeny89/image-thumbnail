import { Router } from "express";
import jsonPatchHandler from "./jsonPatchHandlers";

const jsonPatchRoutes = Router();

jsonPatchRoutes.route("/jsonpatch").patch(jsonPatchHandler);

export default jsonPatchRoutes;
