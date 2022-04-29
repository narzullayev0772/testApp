export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { "x-access-token": "Bearer " + user.token };
  } else {
    return {};
  }
}
