import { Router } from "express";
import thumbnailHandler from "./thumbnailHandlers";

const thumbnailRoutes = Router()

thumbnailRoutes.route("/thumbnail").post(thumbnailHandler)

export default thumbnailRoutes