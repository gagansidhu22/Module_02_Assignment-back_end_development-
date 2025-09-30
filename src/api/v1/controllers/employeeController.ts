// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

// Get all employees
export const getEmployees = (_req: Request, res: Response) => {
  res.status(200).json(employeeService.getAllEmployees());
};

// Get one employee by ID
export const getEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const employee = employeeService.getEmployeeById(id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(employee);
};

// Add employee
export const createEmployee = (req: Request, res: Response) => {
  const newEmployee = employeeService.addEmployee(req.body);
  res.status(201).json(newEmployee);
};

// Update employee
export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = employeeService.updateEmployee(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(updated);
};

// Delete employee
export const deleteEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);

  if (!deleted) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json({ message: "Employee deleted" });
};

// Get employees by branch
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  res.status(200).json(employeeService.getEmployeesByBranch(branchId));
};

// Get employees by department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const department = req.params.department;
  res.status(200).json(employeeService.getEmployeesByDepartment(department));
};
