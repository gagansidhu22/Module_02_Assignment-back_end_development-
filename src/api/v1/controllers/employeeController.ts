// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const getEmployees = (_req: Request, res: Response) => {
  res.json(employeeService.getAllEmployees());
};

export const getEmployee = (req: Request, res: Response) => {
  const employee = employeeService.getEmployeeById(Number(req.params.id));
  if (!employee) return res.status(404).send("Employee not found");
  res.json(employee);
};

export const createEmployee = (req: Request, res: Response) => {
  const newEmployee = employeeService.addEmployee(req.body);
  res.status(201).json(newEmployee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const updated = employeeService.updateEmployee(Number(req.params.id), req.body);
  if (!updated) return res.status(404).send("Employee not found");
  res.json(updated);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const deleted = employeeService.deleteEmployee(Number(req.params.id));
  if (!deleted) return res.status(404).send("Employee not found");
  res.status(204).send();
};
