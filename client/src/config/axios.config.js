import axios from 'axios';
import { generateNewAccessToken } from '../services/auth';
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
 });

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response.status==401 && error.response.message == "Invalid access token"){
            await generateNewAccessToken();
        }
        if(error.resonse.status == 401 && error.resonse.message == "Invalid refresh token"){
            window.location.href = "/";
        }
    }
 )