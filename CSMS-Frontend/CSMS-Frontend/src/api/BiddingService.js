import axios from "axios";
import { BASE_URL } from "./UserService";

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const createBidding = (userId, carId, bidData) =>
    apiClient.post(`/user/${userId}/car/${carId}/biddings`, bidData)

export const deleteBidding = (biddingId) => apiClient.delete(`/biddings/${biddingId}`)

export const getAllBiddingsByUserId = (userId) => apiClient.get(`/users/${userId}/biddings`);

export const getAllBiddingsByCarId = (carId) => apiClient.get(`/cars/${carId}/biddings`);