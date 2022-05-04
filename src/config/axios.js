import axios from "axios";

const instace = axios.create({
  baseURL: "https://apidev.kanvas.dev/v2",
});

instace.defaults.headers.common["Authorization"] = localStorage.token;

export default instace;
