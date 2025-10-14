// import statements
import { Employee } from "../../../data/employees";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "employees";

// Helper to convert Firestore string ID to number (if needed)
const convertId = (id: string): number => {
  const num = Number(id);
  return Number.isNaN(num) ? 0 : num; // fallback if Firestore ID is non-numeric
};

//Create Employee
export const createEmployee = async (data: Partial<Employee>): Promise<Employee> => {
  const requiredFields: (keyof Employee)[] = ["name", "position", "department", "email", "phone", "branchId"];
  for (const field of requiredFields) {
    if (!data[field]) throw new Error(`Missing required field: ${field}`);
  }

  const id = await createDocument<Employee>(COLLECTION, data as Employee);
  return { ...(data as Employee), id: convertId(id) };
};

// Get All Employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => ({ ...(doc.data() as Omit<Employee, "id">), id: convertId(doc.id) }));
};

//Get Employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return null;
  return { ...(doc.data() as Omit<Employee, "id">), id: convertId(doc.id) };
};

// Update Employee
export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee | null> => {
  if (!data || Object.keys(data).length === 0) throw new Error("No fields to update");

  const existing = await getEmployeeById(id);
  if (!existing) return null;

  await updateDocument<Employee>(COLLECTION, id, data as Partial<Employee>);
  return getEmployeeById(id);
};

// Delete Employee
export const deleteEmployee = async (id: string): Promise<boolean> => {
  const existing = await getEmployeeById(id);
  if (!existing) return false;

  try {
    await deleteDocument(COLLECTION, id);
    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return false;
  }
};

// Get Employees by Branch
export const getEmployeesByBranch = async (branchId: number): Promise<Employee[]> => {
  const employees = await getAllEmployees();
  return employees.filter((e) => e.branchId === branchId);
};

// Get Employees by Department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  const employees = await getAllEmployees();
  return employees.filter((e) => e.department === department);
};
