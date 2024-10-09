import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
const app = express();
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import multer from 'multer';
import employeeRouter from './routes/employees.js';
import checkEmailRouter from './routes/checkEmail.js';
import { authenticateToken } from './middlewares/middlewares.js';
dotenv.config();

// Configure multer for file upload
const uploadDir = './public/img/employees';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174', 'http://localhost:3000', 'https://webflix-mu.vercel.app','https://webflix-zzxlo9hb5-anurag-shrivastavs-projects.vercel.app', 'https://delightful-fudge-553d4a.netlify.app','https://webflix-git-master-anurag-shrivastavs-projects.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/employees',authenticateToken,upload.single('f_Image'), employeeRouter); 
app.use('/api/checkEmail',authenticateToken, checkEmailRouter);  

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    
})