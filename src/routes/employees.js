import express from 'express';
import sessionChecker from "#Base/src/middlewares/validate.js";

import { getEmployees, createEmployee, getEmployee, deleteEmployee, updateEmployee } from '../controllers/employees.js';

const router = express.Router();

router.get('/', sessionChecker, getEmployees);

router.post('/', sessionChecker, createEmployee);

router.get('/:id', sessionChecker, getEmployee);

router.delete('/:id', sessionChecker, deleteEmployee);

router.patch('/:id', sessionChecker, updateEmployee);

export default router;