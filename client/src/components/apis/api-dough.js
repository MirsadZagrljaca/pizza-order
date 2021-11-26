import baseUrl from "../../config";

const getDough = () => {
  return fetch(`${baseUrl}api/doughs`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { getDough };
