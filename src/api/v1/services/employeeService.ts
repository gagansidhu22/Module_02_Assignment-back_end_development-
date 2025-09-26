import { employees, Employee } from "../../../data/employees";

// Get all employees
export const getAllEmployees = (): Employee[] => employees;

// Get employee by ID
export const getEmployeeById = (id: number): Employee | undefined =>
  employees.find(emp => emp.id === id);

// Add employee
export const addEmployee = (newEmployee: Employee): Employee => {
  employees.push(newEmployee);
  return newEmployee;
};

// Update employee
export const updateEmployee = (id: number, updates: Partial<Employee>): Employee | null => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  employees[index] = { ...employees[index], ...updates };
  return employees[index];
};

// Delete employee
export const deleteEmployee = (id: number): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};
