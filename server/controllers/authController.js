import LoginModel from "../models/LoginModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI);

        const { username, password } = req.body;
        const errors = {};

  // Username validation
  if (!username || typeof username !== 'string') {
    errors.username = 'Username is required and must be a string';
  } else if (!/^[a-zA-Z0-9_]{3,}$/.test(username)) {
    errors.username = 'Username must be at least 3 characters long and contain only letters, numbers, and underscores';
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    errors.password = 'Password is required and must be a string';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

        const user = await LoginModel.findOne({ f_userName: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        const isMatch = await bcrypt.compare(password, user.f_Pwd);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        delete user.password;
        res.status(200).json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
    }
}

export { login }