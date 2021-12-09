import express from "express";
import adressController from "../controllers/adress.controller";

const router = express.Router();

router
  .route("/api/adress")
  .get(adressController.list)
  .post(adressController.create);

router.param("adressId", adressController.adressById);

router.route("/api/adress/:adressId").delete(adressController.remove);

export default router;
