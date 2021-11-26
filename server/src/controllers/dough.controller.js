import dough from "../../data/types_of_dough.json";

const list = (req, res) => {
  res.status(200).json(dough);
};

export default { list };
