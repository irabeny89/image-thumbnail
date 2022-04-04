import { Router } from "express";
import { loginHandler } from "./authHandlers";

const authRouter = Router();

authRouter.route("/login").post(loginHandler);

export default authRouter;
