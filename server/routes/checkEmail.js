import express from 'express';
import {duplicateEmailCheck} from '../controllers/checkEmailConroller.js';
const router=express.Router();

router.post('/',duplicateEmailCheck);

export default router