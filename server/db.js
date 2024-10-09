import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;