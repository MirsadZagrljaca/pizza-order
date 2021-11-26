import ingredients from "../../data/ingredients.json";

const list = (req, res) => {
  res.status(200).json(ingredients);
};

export default { list };
