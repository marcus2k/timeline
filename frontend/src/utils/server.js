import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const server = axios.create({
  baseURL: SERVER_BASE_URL,
});

export default server;
