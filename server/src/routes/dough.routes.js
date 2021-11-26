import express from "express";
import doughController from "../controllers/dough.controller";

const router = express.Router();

router.route("/api/doughs").get(doughController.list);

export default router;
