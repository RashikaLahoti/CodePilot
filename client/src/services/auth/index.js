import { axiosInstance } from "../../config/axios.config";
import { asyncHandler } from "../../utils/AsyncHandler";

export const generateNewAccessToken = asyncHandler(async () => {
        const response = await axiosInstance.post('/user/refresh-token');
        return response.data.accessToken;
})

export const loginUser = asyncHandler(async (email, password) => {
        const response = await axiosInstance.post('/user/login', {email, password});
        return response.data;
})

export const registerUser = asyncHandler(async (name, email, password) => {
        const response = await axiosInstance.post('/user/register', {name, email, password});
        return response.data;
})

export const logoutUser = asyncHandler(async () => {
        const response = await axiosInstance.post('/user/logout');
        return response.data;
})

export const me = asyncHandler(async () => {
        const response = await axiosInstance.get('/user/me');
        return response.data;
})