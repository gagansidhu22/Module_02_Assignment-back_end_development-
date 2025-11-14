// import
import Joi from "joi";

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
 *           example: "Alice Johnson"
 *         position:
 *           type: string
 *           example: "Chef"
 *         department:
 *           type: string
 *           example: "Kitchen"
 *         email:
 *           type: string
 *           example: "alice.johnson@restaurant.com"
 *         phone:
 *           type: string
 *           example: "204-555-9876"
 *         branchId:
 *           type: string
 *           example: "branch_123"

 *     UpdateEmployee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Robert Miller"
 *         position:
 *           type: string
 *           example: "Head Chef"
 *         department:
 *           type: string
 *           example: "Management"
 *         email:
 *           type: string
 *           example: "robert.miller@restaurant.com"
 *         phone:
 *           type: string
 *           example: "204-555-7890"
 *         branchId:
 *           type: string
 *           example: "branch_002"

 *     DeleteEmployee:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "employee_456"
 */

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).min(10).max(15).required(),
  branchId: Joi.string().required(),
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  position: Joi.string().min(2).max(50),
  department: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).min(10).max(15),
  branchId: Joi.string(),
});

export const deleteEmployeeSchema = Joi.object({
  id: Joi.string().required(),
});
