import express from "express";
import historyController from "../controllers/history.controller";

const router = express.Router();

router
  .route("/api/history")
  .get(historyController.list)
  .post(historyController.create);

export default router;
