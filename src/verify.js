import axios from "axios";

export default async function verify(setData) {
  if (localStorage.getItem("user")) {

    const user = JSON.parse(localStorage.getItem("user"));
    
    let { data } = await axios.post(
      "http://localhost:5000/api/v1/auth/verify",
      {
        username: user?.data.username,
      },
      {
        headers: {
          "x-access-token": user?.data.token,
        },
      }
    );
    if (data.status === "success") {
      setData(data);
    } else {
      localStorage.removeItem("user");
    }
  }
}
