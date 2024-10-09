import EmployeeModel from '../models/EmployeeModel.js';
import uploadCloudinary from '../utils/cloudinary.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config();





const fetchEmployees = async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const query = search
      ? { f_Name: { $regex: search, $options: 'i' } }
      : {};
    
    const employees = await EmployeeModel.find(query)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const totalEmployees = await EmployeeModel.countDocuments(query);
    
    res.json({
      employees,
      totalPages: Math.ceil(totalEmployees / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  } finally {
    await mongoose.disconnect();
  }
};

export { fetchEmployees };



const updateEmployee = async (req, res) => {
    console.log(req.body.f_Image) 
    try {
        
      await mongoose.connect(process.env.MONGODB_URI);
  
      const { f_Id } = req.params;
      const updatedData = req.body;
  
      if (req.file) {
        // Use the file path from multer
        const cloudinaryResult = await uploadCloudinary(req.file.path);
        if (!cloudinaryResult) {
          return res.status(500).json({ message: 'Error uploading image' });
        }
        updatedData.f_Image = cloudinaryResult.secure_url;
        console.log(updatedData.f_Image)    
      }
  
      // Update the employee
      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { f_Id },
        { $set: updatedData },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee successfully updated', data: updatedEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error: error.message });
    } finally {
      await mongoose.disconnect();
    }
  };

export  {updateEmployee};




const createEmployee = async (req, res) => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    if (req.file) {
        // Use the file path from multer
        const cloudinaryResult = await uploadCloudinary(req.file.path);
        if (!cloudinaryResult) {
          return res.status(500).json({ message: 'Error uploading image' });
        }
        req.body.f_Image = cloudinaryResult.secure_url;
      }
 
    // Extract employee data from the request body
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Image } = req.body;
    
    // Create a new employee document
    console.log(typeof (req.body.f_Image))
    const newEmployee = new EmployeeModel({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image,
    });
    
    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Respond with the saved employee data
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
};

export { createEmployee };


const deleteEmployee = async (req, res) => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Extract employee data from the request body
    const { f_Id } = req.params;
    console.log(f_Id)
    // Delete the employee from the database
    const deletedEmployee = await EmployeeModel.findOneAndDelete({ f_Id });
    
    if (!deletedEmployee) { 
      return res.status(404).json({ message: 'Employee not found' });
    }   

    res.status(200).json({ message: 'Employee successfully deleted', data: deletedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  } 
};

export { deleteEmployee };