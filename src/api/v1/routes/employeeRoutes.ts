import express from "express";
import * as employeeController from "../controllers/employeeController";

const router = express.Router();

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployee);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/department/:department", employeeController.getEmployeesByDepartment);


export default router;
