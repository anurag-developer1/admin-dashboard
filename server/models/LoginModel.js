import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  f_sno: {
    type: String,
    required: true,
    unique: true
  },
    f_userName: {
      type: String,
      required: true,
      unique: true
    },
    f_Pwd: {
      type: String,
      required: true
    }
  });

  const LoginModel = mongoose.model('t_login', loginSchema);
  export default LoginModel;