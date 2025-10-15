import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { ApiResponse } from "../models/responseModel";
import { Employee } from "../../../data/employees";

// Create Employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    const response: ApiResponse<Employee> = {
      success: true,
      message: "Employee created successfully",
      data: employee,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Error in createEmployee:", error);
    res.status(500).json({ success: false, message: "Failed to create employee" });
  }
};

// Get All Employees
export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    const response: ApiResponse<Employee[]> = {
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getAllEmployees:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve employees" });
  }
};

// Get Employee By ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const emp = await employeeService.getEmployeeById(id);
    if (!emp) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const response: ApiResponse<Employee> = {
      success: true,
      message: "Employee retrieved successfully",
      data: emp,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve employee" });
  }
};

// Update Employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const updated = await employeeService.updateEmployee(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const response: ApiResponse<Employee> = {
      success: true,
      message: "Employee updated successfully",
      data: updated,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    res.status(500).json({ success: false, message: "Failed to update employee" });
  }
};

// Delete Employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const deleted = await employeeService.deleteEmployee(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    res.status(500).json({ success: false, message: "Failed to delete employee" });
  }
};

// Get Employees by Branch
export const getEmployeesByBranch = async (req: Request, res: Response) => {
  try {
    const branchId = Number(req.params.branchId);
    if (isNaN(branchId)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Invalid branchId",
      };
      res.status(400).json(response);
      return;
    }

    const employees = await employeeService.getEmployeesByBranch(branchId);
    const response: ApiResponse<Employee[]> = {
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getEmployeesByBranch:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to retrieve employees by branch",
    };
    res.status(500).json(response);
  }
};

// Get Employees by Department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const department = req.params.department;
    if (!department) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Department is required",
      };
      res.status(400).json(response);
      return;
    }

    const employees = await employeeService.getEmployeesByDepartment(department);
    const response: ApiResponse<Employee[]> = {
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getEmployeesByDepartment:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to retrieve employees by department",
    };
    res.status(500).json(response);
  }
};
