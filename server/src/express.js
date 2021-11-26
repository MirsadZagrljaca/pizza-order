import express from "express";
import Template from "../template";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import doughRoutes from "./routes/dough.routes";
import ingredientsRoutes from "./routes/ingredients.routes";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", doughRoutes);
app.use("/", ingredientsRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

export default app;
