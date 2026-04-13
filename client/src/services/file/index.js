import{ asyncHandler } from "../../utils/asyncHandler.js";
import { axiosInstance } from "../../config/axios.config.js";

export const createFile = asyncHandler(async ({name,type,content}) => {
    const response = await axiosInstance.post("/file/create",{
        name,
        type,
        content
    })
    return response.data;
})