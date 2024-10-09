import mongoose from "mongoose";
import dotenv from "dotenv";
import EmployeeModel from "../models/EmployeeModel.js";
dotenv.config();

const duplicateEmailCheck = async (req, res) => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI);
        const { email } = req.body;
        const user = await EmployeeModel.findOne({ f_Email: email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists', isUnique: false });
        } else {
            return res.status(200).json({ message: 'Email available', isUnique: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking email', error: error.message, isUnique: false });
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
    }   
}

export { duplicateEmailCheck } 