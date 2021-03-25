import axios from "axios";
require("dotenv").config();

const purchasesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/purchases`,
  withCredentials: true,
});

export const createPurchases = (buyer) => purchasesApi.post("/",buyer);

export const getPurchases = (userId) => purchasesApi.get(`/${userId}`);

export const getPurchasesSeller = (userId) => purchasesApi.get(`/seller/${userId}`);

export const updatePurchases = (userId,opinion) => purchasesApi.post(`/update/${userId}`,opinion);