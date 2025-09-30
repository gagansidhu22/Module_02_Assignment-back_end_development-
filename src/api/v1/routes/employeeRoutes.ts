import express from "express";
import * as employeeController from "../controllers/employeeController";

const router = express.Router();

// Specific routes first
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

// All employees
router.get("/", employeeController.getEmployees);

// Single employee by ID
router.get("/:id", employeeController.getEmployee);

// CRUD
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;
