// import 
import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
   phone: Joi.string()
    .pattern(/^[0-9\-]+$/)
    .min(10)
    .max(15)
    .required(),
  branchId: Joi.string().required(), 
});

// Update Employee Validation
export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  position: Joi.string().min(2).max(50),
  department: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9\-]+$/)
    .min(10)
    .max(15),
  branchId: Joi.string().required(),
});

// DELETE Employee Validation
export const deleteEmployeeSchema = Joi.object({
  id: Joi.string().required(),
});
