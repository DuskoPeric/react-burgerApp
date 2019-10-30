import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-6aa89.firebaseio.com/"
});

export default instance;
