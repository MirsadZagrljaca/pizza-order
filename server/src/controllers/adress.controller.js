import Adress from "../models/adress.model";
import dbErrorHandler from "../helpers/dbErrorHandler";

const adressById = (req, res, next, id) => {
  Adress.findById(id).exec((err, adress) => {
    if (err !== null || !adress) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    req.profile = adress;
    next();
  });
};

const create = (req, res, next) => {
  const adress = new Adress(req.body);

  adress.save((err, results) => {
    if (err !== null) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.status(200).json(adress);
  });
};

const list = (req, res) => {
  Adress.find((err, adress) => {
    if (err !== null) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.status(200).json(adress);
  }).select("_id userId adress floor");
};

const remove = (req, res) => {
  let adress = req.profile;

  if (!req.profile) return;

  adress.remove((err, deletedAdress) => {
    if (err) {
      return res.status(400).json({ error: "Error" });
    }

    res.status(200).json({ message: "Adress Removed" });
  });
};

export default { create, list, adressById, remove };
