import mongoose from "mongoose";
import envVariables from "./config.env.js"

const connectDB = async () => {
    try {
        await mongoose.connect(envVariables.mongodburi);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
