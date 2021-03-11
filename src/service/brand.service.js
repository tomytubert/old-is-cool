import axios from "axios";
require("dotenv").config();

const brandApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/brand`,
  withCredentials: true,
});

export const getBrands = () => brandApi.get("/getAll");

