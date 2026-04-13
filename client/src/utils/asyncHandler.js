export const asyncHandler = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.log(error);
            throw error; // important for further handling
        }
    };
};