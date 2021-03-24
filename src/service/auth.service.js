import axios from "axios";
require("dotenv").config();

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/auth`,
  withCredentials: true,
});

export const login = (user) => authApi.post("/login", user);

export const signup = (user) => authApi.post("/signup", user);

export const logout = () => authApi.post("/logout");

export const getUser = () => authApi.get(`/`);

export const update = (profile) => authApi.post("/update",profile);

export const sell = (advertId) => authApi.post(`/${advertId}/sell`);
