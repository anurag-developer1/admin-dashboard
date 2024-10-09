import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

// Pass the mongoose instance to the AutoIncrementFactory
const AutoIncrement = AutoIncrementFactory(mongoose);

const employeeSchema = new mongoose.Schema({
  f_Id: {
    type: Number, // Change to Number for auto-increment
    unique: true, // Ensure uniqueness
  },
  f_Name: {
    type: String,
    required: true
  },
  f_Email: {
    type: String,
    required: true,
    unique: true
  },
  f_Mobile: {
    type: String,
    required: true
  },
  f_Designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
    required: true
  },
  f_gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  f_Course: [{
    type: String,
    enum: ['MCA', 'BCA', 'BSC']
  }],
  f_Image: {
    type: String
  },
  f_Createdate: {
    type: Date,
    default: Date.now
  }
});

// Apply the auto-increment plugin to the schema
employeeSchema.plugin(AutoIncrement, { inc_field: 'f_Id' });

const EmployeeModel = mongoose.model('t_employee', employeeSchema);
export default EmployeeModel;