import axios from "axios";

const buyerClient = axios.create({
    baseURL: "http://localhost:9191/api/v1"
})

export const loginBuyer = (buyerData) => buyerClient.post(`/buyers/login`, buyerData)

export const getSingleBuyer = (buyerId) => buyerClient.get(`/buyers/${buyerId}`);

export const getAllBuyers = () => buyerClient.get(`/buyers`);

export const createBuyer = (buyerData) => buyerClient.post(`/buyers`, buyerData);

export const updateBuyer = (buyerData, buyerId) => buyerClient.put(`/buyers/${buyerId}`, buyerData);

export const deleteBuyer = (buyerId) => buyerClient.delete(`/buyers/${buyerId}`);