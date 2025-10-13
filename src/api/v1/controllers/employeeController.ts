// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";
import { ApiResponse } from "../models/responseModel";

export function createEmployee(req: Request, res: Response): void {
  const employee = employeeService.createEmployee(req.body);
  if (!employee) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Missing required fields",
    };
    res.status(400).json(response);
  } else {
    const response: ApiResponse<Employee> = {
      success: true,
      message: "Employee created successfully",
      data: employee,
    };
    res.status(201).json(response);
  }
}

export function getEmployees(_req: Request, res: Response): void {
  const employees = employeeService.getAllEmployees();
  const response: ApiResponse<Employee[]> = {
    success: true,
    message: "Employees retrieved successfully",
    data: employees,
  };
  res.json(response);
}

export function getEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const emp = employeeService.getEmployeeById(id);
  if (!emp) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Employee not found",
    };
    res.status(404).json(response);
  } else {
    const response: ApiResponse<Employee> = {
      success: true,
      message: "Employee retrieved successfully",
      data: emp,
    };
    res.json(response);
  }
}

export function updateEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const updated = employeeService.updateEmployee(id, req.body);
  if (!updated) {
    if (!req.body || Object.keys(req.body).length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: "No fields to update",
      };
      res.status(400).json(response);
    } else {
      const response: ApiResponse<null> = {
        success: false,
        message: "Employee not found",
      };
      res.status(404).json(response);
    }
  } else {
    const response: ApiResponse<Employee> = {
      success: true,
      message: "Employee updated successfully",
      data: updated,
    };
    res.json(response);
  }
}

export function deleteEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);
  if (!deleted) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Employee not found",
    };
    res.status(404).json(response);
  } else {
    const response: ApiResponse<null> = {
      success: true,
      message: "Employee deleted",
    };
    res.json(response);
  }
}

export function getEmployeesByBranch(req: Request, res: Response): void {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Invalid branchId",
    };
    res.status(400).json(response);
    return;
  }
  const employees = employeeService.getEmployeesByBranch(branchId) || [];
  const response: ApiResponse<Employee[]> = {
    success: true,
    message: "Employees retrieved successfully",
    data: employees,
  };
  res.json(response);
}

export function getEmployeesByDepartment(req: Request, res: Response): void {
  const department = req.params.department;
  try {
    const employees = employeeService.getEmployeesByDepartment(department);
    const response: ApiResponse<Employee[]> = {
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Server error",
    };
    res.status(500).json(response);
  }
}
