import axios from "axios";
require("dotenv").config();

const advertApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/advert`,
  withCredentials: true,
});

export const likedAdvert = (advertId) => advertApi.post("/likedAdvert",advertId)

export const unLikedAdvert = (advertId) => advertApi.post("/unLikedAdvert",advertId)

export const getAdvert = (advertId) => advertApi.get(`/${advertId}`);

export const createAdvert = (advert) => advertApi.post("/newAdvert",advert);

export const uploadFile = (file) => advertApi.post("/upload",file)

export const findAdverts = (query) => advertApi.get(`/findAdverts?${query}`)

export const getAdverts = () => advertApi.get("/getAll");

export const deleteAdvert = (advertId) => advertApi.delete(`/${advertId}/delete`);

export const updateAdvertService = (advert) => advertApi.post(`/edit`,advert)


