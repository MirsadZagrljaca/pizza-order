import User from "../models/user.model";
import _, { join } from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const user = new User(req.body);

  user.save((err, results) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    res.status(200).json({ message: "Account Created!" });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    res.status(200).json(users);
  }).select("_id name email created updated");
};

export default { create, list };
