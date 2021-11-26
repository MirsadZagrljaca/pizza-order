import express from "express";
import ingredientsController from "../controllers/ingredients.controller";

const router = express.Router();

router.route("/api/ingredients").get(ingredientsController.list);

export default router;
