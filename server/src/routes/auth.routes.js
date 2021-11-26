import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route("/auth/signin").post(authController.signin);

router.route("/auth/signout").post(authController.signout);

export default router;
