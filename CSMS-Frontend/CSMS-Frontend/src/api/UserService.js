import axios from "axios";

export const BASE_URL = 'http://localhost:9191/api/v1'

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const loginUser = (userData) => apiClient.post("/users/login", userData);

export const getAllUsers = () => apiClient.get(`/users`)

export const getSingleUser = (userId) => apiClient.get(`/users/${userId}`);

export const createUser = (userData) => apiClient.post(`/users`, userData);

export const updateUser = (userId, userData, isSeller) =>
    apiClient.put(`/users/${userId}?isSeller=${isSeller}`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

export const deleteUser = (userId) => apiClient.delete(`/users/${userId}`);

export const uploadUserProfileImage = (userId, image) => {
    const formData = new FormData();
    formData.append("image", image)
    return apiClient.post(`/users/${userId}/upload/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const uploadCarImage = (carId, images) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
    }
    return apiClient.post(`/upload/${carId}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
} 