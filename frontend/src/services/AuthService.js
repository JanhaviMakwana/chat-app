import axios from "../axios";

const AuthService = {
  login: (authData) => {
    return axios
      .post("/api/auth/login", authData)
      .then(({ data }) => {
        console.log(data);
        setHeaderAndStorage(data);
        return data;
      })
      .catch((err) => {
        console.log(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  },
  register: (authData) => {
      console.log(authData);
    return axios
      .post("/api/auth/register", authData)
      .then(({ data }) => {
        setHeaderAndStorage(data);
        return data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
};

const setHeaderAndStorage = ({user, token }) => {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("token", token);
  localStorage.setItem("user", user);
};

export default AuthService;
