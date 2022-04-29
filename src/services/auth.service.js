const { default: axios } = require("axios");
const API_URL = "http://localhost:5000/api/v1";
class AuthService {
  async login(email, password, setStatus, setData, setLoading, navigate) {
    return axios
      .post(API_URL + "/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        setStatus(true);
        setData(data);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(err.response?.data?.message);
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(obj) {
    return axios.post(API_URL + "/auth/register", obj);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
