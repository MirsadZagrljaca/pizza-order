import baseUrl from "../../config";

const getIngredients = () => {
  return fetch(`${baseUrl}api/ingredients`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { getIngredients };
