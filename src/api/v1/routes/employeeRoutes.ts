import { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Employees
 *   description: Employee management API
 */

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
 *             $ref: '#/components/schemas/CreateEmployee'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *       '400':
 *         description: Invalid employee data
 */
router.post("/", employeeController.createEmployee);

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: List of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Get employees by branch ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the branch
 *     responses:
 *       '200':
 *         description: Employees for the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 *       '404':
 *         description: Branch not found
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name (e.g., HR, IT, Sales)
 *     responses:
 *       '200':
 *         description: Employees for the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 *       '404':
 *         description: No employees found
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEmployee'
 *       '404':
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update employee by ID
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
 *             $ref: '#/components/schemas/UpdateEmployee'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *       '404':
 *         description: Employee not found
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Employee deleted
 *       '404':
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);

export default router;
