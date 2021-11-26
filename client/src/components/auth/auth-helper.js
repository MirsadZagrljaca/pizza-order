function authenticate(token, callback) {
  if (typeof window !== "undefined")
    localStorage.setItem("token", JSON.stringify(token));

  callback();
}

function isAuthenticated() {
  if (typeof window == "undefined") return false;

  if (!localStorage.getItem("token")) return false;

  return JSON.parse(localStorage.getItem("token"));
}

function clearToken(callback) {
  if (typeof window !== "undefined") localStorage.removeItem("token");

  callback();
}

export default { authenticate, isAuthenticated, clearToken };
