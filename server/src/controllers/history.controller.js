import History from "../models/history.model";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const history = new History(req.body);

  history.save((err, results) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    res.status(200).json({ message: "History Added!" });
  });
};

const list = (req, res) => {
  History.find((err, history) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    res.status(200).json(history);
  }).select("userId total date dough ingredients times");
};

export default { create, list };
