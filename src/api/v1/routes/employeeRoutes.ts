import express from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/RequestValidation";
import { employeeSchema } from "../validation/employeeValidation";

const router = express.Router();

// Specific routes 
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

// All employees
router.get("/", employeeController.getEmployees);

// Single employee by ID
router.get("/:id", employeeController.getEmployee);

// ✅ CRUD (with Joi validation on create and update)
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);
router.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;
