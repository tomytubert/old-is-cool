import axios from "axios";
require("dotenv").config();

const advertApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/advert`,
  withCredentials: true,
});

export const getAdvert = (advertId) => advertApi.get(`/${advertId}`);

export const createAdvert = () => advertApi.post("/newAdvert");

export const getAdverts = () => advertApi.get("/getAll");

export const deleteAdvert = (advertId) => advertApi.delete(`/${advertId}/delete`);

export const updateAdvert = (advertId) => advertApi.post(`/${advertId}/edit`)


