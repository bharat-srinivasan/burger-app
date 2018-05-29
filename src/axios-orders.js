import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-react-98226.firebaseio.com/"
});

export default instance;
