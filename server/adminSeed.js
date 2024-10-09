import LoginModel from "./models/LoginModel.js"
import EmployeeModel from "./models/EmployeeModel.js"
import bcrypt from "bcrypt"
import connectDB from "./db.js"

const createAdmin=async()=>{   
    connectDB();  
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin@123", salt);
    const admin = new LoginModel({
      f_sno:"1",  
      f_userName: "admin",
      f_Pwd: hashedPassword,
    });
    await admin.save();
    let createDate = new Date();
    const adminEmployee = new EmployeeModel({
        f_Id: 1,
        f_Name: "Hukum Gupta",
        f_Email: "hcgupta@cstech.in",
        f_Mobile: "954010044",
        f_Designation: "HR",
        f_gender: "Male",
        f_Course: "MCA",
        f_Image: "https://img.freepik.com/free-vector/business-marketing-infographic_23-2147517533.jpg?t=st=1728479470~exp=1728483070~hmac=4c9e7bf98dc6339ac61d103cc709368b6064aa3739d5f32cfbbfaef44ac83c96&w=1060",
        f_CreateDate: createDate
    })
    await adminEmployee.save();
  }
  catch(error){
    console.log(error)
  }

}
createAdmin()