import { axiosInstance } from "../../config/axios.config";

const asyncHandler = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.log(error);
            throw error; // important for further handling
        }
    };
};
const str = 'hello hdaksfksn fds fklnds fj sd *** folrt:{dsfds:SDFDSFDS:dsfdsf}}'


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