import express from "express";
import { logOut , login , signUp , checkAuth } from "../controller/auth.js";
import protectedRoute from "../middleware/protectedRoute.js";

const authRouter = express.Router();

authRouter.post("/signUp" , signUp);
authRouter.post("/logIn" , login);
authRouter.post("/logOut", logOut);
authRouter.post("/checkAuth", protectedRoute , checkAuth);

export default authRouter;