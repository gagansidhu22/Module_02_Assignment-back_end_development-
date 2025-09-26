// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const getEmployees = (_req: Request, res: Response) => {
  return res.status(200).json(employeeService.getAllEmployees());
};

export const getEmployee = (req: Request, res: Response) => {
  const employee = employeeService.getEmployeeById(Number(req.params.id));
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  return res.status(200).json(employee);
};

export const createEmployee = (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body;

  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newEmployee = employeeService.addEmployee({
    id: Date.now(), // generate unique id
    name,
    position,
    department,
    email,
    phone,
    branchId,
  });

  return res.status(201).json(newEmployee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  const updated = employeeService.updateEmployee(id, updates);
  if (!updated) return res.status(404).json({ message: "Employee not found" });

  return res.status(200).json(updated);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const deleted = employeeService.deleteEmployee(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Employee not found" });
  return res.status(200).json({ message: "Employee deleted successfully" });
};

// Get employees by branch
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) {
    return res.status(400).json({ message: "Invalid or missing branch ID" });
  }
  const branchEmployees = employeeService.getEmployeesByBranch(branchId);
  return res.status(200).json(branchEmployees);
};

// Get employees by department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params;
  if (!department) {
    return res.status(400).json({ message: "Department is required" });
  }
  const deptEmployees = employeeService.getEmployeesByDepartment(department);
  return res.status(200).json(deptEmployees);
};
