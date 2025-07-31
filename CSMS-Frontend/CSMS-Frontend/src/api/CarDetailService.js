import axios from "axios";

const carClient = axios.create({
    baseURL: "http://localhost:9191/api/v1"
})


export const getSingleCarDetails = (carId) => carClient.get(`/cars/${carId}`);

export const getAllCarDetails = () => carClient.get(`/cars`);

export const createCarDetails = (sellerId, carData) =>
    carClient.post(`/users/${sellerId}/cars`, carData);

export const updateCarDetails = (carData, carId) => carClient.put(`/cars/${carId}`, carData);

export const deleteCarDetails = (carId) => carClient.delete(`/cars/${carId}`);

export const getAllImagesByCarID = (carId) => carClient.get(`/download/${carId}/images`);

export const getAllCarsByUserId = (userId) => carClient.get(`/users/${userId}/cars`);

export const getAllCarDetailsByBrandName = (keyword) => carClient.get(`/cars/search?keyword=${keyword}`)