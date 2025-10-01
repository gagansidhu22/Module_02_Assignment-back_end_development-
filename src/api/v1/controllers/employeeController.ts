// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export function createEmployee(req: Request, res: Response): void {
  const employee = employeeService.createEmployee(req.body);
  if (!employee) {
    res.status(400).json({ message: "Missing required fields" });
  } else {
    res.status(201).json(employee);
  }
}

export function getEmployees(_req: Request, res: Response): void {
  res.json(employeeService.getAllEmployees());
}

export function getEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const emp = employeeService.getEmployeeById(id);
  if (!emp) res.status(404).json({ message: "Employee not found" });
  else res.json(emp);
}

export function updateEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const updated = employeeService.updateEmployee(id, req.body);
  if (!updated) {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "No fields to update" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } else {
    res.json(updated);
  }
}

export function deleteEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);
  if (!deleted) res.status(404).json({ message: "Employee not found" });
  else res.json({ message: "Employee deleted" });
}

export function getEmployeesByBranch(req: Request, res: Response): void {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) {
    res.status(400).json({ message: "Invalid branchId" });
    return;
  }
  res.json(employeeService.getEmployeesByBranch(branchId) || []);
}

export function getEmployeesByDepartment(req: Request, res: Response): void {
  const department = req.params.department;
  try {
    res.json(employeeService.getEmployeesByDepartment(department));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
