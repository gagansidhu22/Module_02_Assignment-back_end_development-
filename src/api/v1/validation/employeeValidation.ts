// import 
import Joi from "joi";
// Create Employee 
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEmployee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Full name of the employee
 *           example: "Alice Johnson"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Job title or position of the employee
 *           example: "Chef"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Department where the employee works
 *           example: "Kitchen"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee's official email address
 *           example: "alice.johnson@restaurant.com"
 *         phone:
 *           type: string
 *           pattern: "^[0-9\\-]+$"
 *           minLength: 10
 *           maxLength: 15
 *           description: Contact phone number of the employee
 *           example: "204-555-9876"
 *         branchId:
 *           type: string
 *           description: ID of the branch where the employee works
 *           example: "branch_123"
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateEmployee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Updated name of the employee
 *           example: "Robert Miller"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Updated job position
 *           example: "Head Chef"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Updated department
 *           example: "Management"
 *         email:
 *           type: string
 *           format: email
 *           description: Updated email address
 *           example: "robert.miller@restaurant.com"
 *         phone:
 *           type: string
 *           pattern: "^[0-9\\-]+$"
 *           minLength: 10
 *           maxLength: 15
 *           description: Updated phone number
 *           example: "204-555-7890"
 *         branchId:
 *           type: string
 *           description: Branch ID the employee is assigned to
 *           example: "branch_002"
 */
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
/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteEmployee:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the employee to delete
 *           example: "employee_456"
 */
export const deleteEmployeeSchema = Joi.object({
  id: Joi.string().required(),
});
