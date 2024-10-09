import express from 'express';

import { fetchEmployees, updateEmployee,createEmployee,deleteEmployee } from '../controllers/employeeController.js';
const router = express.Router();

// GET /api/employees - Fetch all employees
router.get('/fetchEmployees', fetchEmployees);
router.post('/createEmployee', createEmployee);
router.delete('/:f_Id', deleteEmployee);

// PUT /api/employees/:id - Update an employee
router.put('/:f_Id', updateEmployee);



export default router;