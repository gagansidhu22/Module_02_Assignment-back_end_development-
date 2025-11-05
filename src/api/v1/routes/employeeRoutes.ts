import { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router = Router();

// Example: Create a new employee
/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/EmployeeCreate'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *       '400':
 *         description: Invalid employee data
 */
router.post("/", employeeController.createEmployee);

// Example: Get all employees
/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/validations/Employee'
 */
router.get("/", employeeController.getAllEmployees);

// Example: Get employee by ID
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Retrieve an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Employee details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Employee'
 *       '404':
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

// Example: Update employee
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/EmployeeUpdate'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *       '404':
 *         description: Employee not found
 */
router.put("/:id", employeeController.updateEmployee);

// Example: Delete employee
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);

// Example: Get all employees by branch ID
/**
 * @openapi
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Retrieve employees belonging to a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the branch
 *     responses:
 *       '200':
 *         description: Successfully retrieved employees for the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/validations/Employee'
 *       '404':
 *         description: Branch not found or no employees found in branch
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

// Example: Get all employees by department
/**
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Retrieve employees belonging to a specific department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The department name (e.g., HR, Sales, IT)
 *     responses:
 *       '200':
 *         description: Successfully retrieved employees in the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/validations/Employee'
 *       '404':
 *         description: Department not found or no employees in department
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);


export default router;
