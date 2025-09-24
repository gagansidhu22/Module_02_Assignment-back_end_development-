import { employees, Employee } from "../../../data/employees";

// Get all employees
export const getAllEmployees = (): Employee[] => {
  return employees;
};

// Get an employee by ID
export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find(emp => emp.id === id);
};

// Add a new employee
export const addEmployee = (newEmployee: Employee): Employee => {
  employees.push(newEmployee);
  return newEmployee;
};

// Update an employee
export const updateEmployee = (id: number, updatedData: Partial<Employee>): Employee | null => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedData };
    return employees[index];
  }
  return null;
};

// Delete an employee
export const deleteEmployee = (id: number): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    return true;
  }
  return false;
};
