import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").post(logoutUser); 

export default userRoutes;
