import { Router } from "express";
import { registerUser } from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post("/registration", registerUser);

export default authRouter;
