// src/api/v1/services/employeeService.ts
import { Employee } from "../../../data/employees";

let employees: Employee[] = [];
let nextId = 1;

// Create employee with validation
export function createEmployee(data: Partial<Employee>): Employee | null {
  if (!data.name || !data.position || !data.department || !data.email || !data.phone || !data.branchId) {
    return null; // Missing required fields
  }

  const newEmployee: Employee = {
    id: nextId++,
    name: data.name,
    position: data.position,
    department: data.department,
    email: data.email,
    phone: data.phone,
    branchId: data.branchId,
  };

  employees.push(newEmployee);
  return newEmployee;
}

// Get all employees
export function getAllEmployees(): Employee[] {
  return employees;
}

// Get employee by ID
export function getEmployeeById(id: number): Employee | undefined {
  return employees.find(emp => emp.id === id);
}

// Update employee
export function updateEmployee(id: number, data: Partial<Employee>): Employee | null {
  const emp = employees.find(emp => emp.id === id);
  if (!emp) return null;

  if (!data.name && !data.position && !data.department && !data.email && !data.phone && !data.branchId) {
    return null; // No update fields provided
  }

  Object.assign(emp, data);
  return emp;
}

// Delete employee
export function deleteEmployee(id: number): boolean {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
}

// Get employees by branch
export function getEmployeesByBranch(branchId: number): Employee[] | null {
  if (isNaN(branchId)) return null;
  return employees.filter(emp => emp.branchId === branchId);
}

// Get employees by department
export function getEmployeesByDepartment(department: string): Employee[] {
  return employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
}
