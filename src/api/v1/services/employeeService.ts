import { Employee } from "../../../data/employees";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "employees";

// ✅ Create employee
export const createEmployee = async (data: Partial<Employee>): Promise<Employee | null> => {
  try {
    if (
      !data.name ||
      !data.position ||
      !data.department ||
      !data.email ||
      !data.phone ||
      !data.branchId
    ) {
      return null;
    }

    const id = await createDocument<Employee>(COLLECTION, data);
    // Convert Firestore string id to number (if your Employee.id expects a number)
    const newEmployee: Employee = {
      ...(data as Employee),
      id: Number.isNaN(Number(id)) ? 0 : Number(id), // fallback if Firestore auto-id is non-numeric
    };
    return newEmployee;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Failed to create employee");
  }
};

// ✅ Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const snapshot = await getDocuments(COLLECTION);
    const employees: Employee[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Employee, "id">;
      return {
        ...data,
        id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
      };
    });
    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Failed to fetch employees");
  }
};

// ✅ Get employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc || !doc.exists) return null;

    const data = doc.data() as Omit<Employee, "id">;
    return {
      ...data,
      id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
    };
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw new Error("Failed to fetch employee");
  }
};

// ✅ Update employee
export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee | null> => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No fields to update");
    }

    await updateDocument<Employee>(COLLECTION, id, data);
    const updatedDoc = await getDocumentById(COLLECTION, id);

    if (!updatedDoc || !updatedDoc.exists) return null;

    const updatedData = updatedDoc.data() as Omit<Employee, "id">;
    return {
      ...updatedData,
      id: Number.isNaN(Number(updatedDoc.id)) ? 0 : Number(updatedDoc.id),
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Failed to update employee");
  }
};

// ✅ Delete employee
export const deleteEmployee = async (id: string): Promise<boolean> => {
  try {
    await deleteDocument(COLLECTION, id);
    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Failed to delete employee");
  }
};

// ✅ Get employees by branch
export const getEmployeesByBranch = async (branchId: number): Promise<Employee[]> => {
  try {
    const snapshot = await getDocuments(COLLECTION);
    const allEmployees: Employee[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Employee, "id">;
      return {
        ...data,
        id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
      };
    });
    return allEmployees.filter((emp) => emp.branchId === branchId);
  } catch (error) {
    console.error("Error fetching employees by branch:", error);
    throw new Error("Failed to fetch employees by branch");
  }
};

// ✅ Get employees by department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  try {
    const snapshot = await getDocuments(COLLECTION);
    const allEmployees: Employee[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Employee, "id">;
      return {
        ...data,
        id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
      };
    });
    return allEmployees.filter(
      (emp) => emp.department.toLowerCase() === department.toLowerCase()
    );
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    throw new Error("Failed to fetch employees by department");
  }
};
