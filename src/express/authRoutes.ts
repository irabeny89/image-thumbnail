import { Router } from "express";
import loginHandler from "./authHandlers";

const authRoutes = Router();

authRoutes.route("/login").post(loginHandler);

export default authRoutes;
