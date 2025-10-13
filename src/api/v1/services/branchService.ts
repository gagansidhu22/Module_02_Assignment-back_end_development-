import { Branch } from "../../../data/branches";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

// ✅ Create a new branch
export const createBranch = async (data: Omit<Branch, "id">): Promise<Branch> => {
  try {
    if (!data.name || !data.address || !data.phone) {
      throw new Error("Missing required branch fields");
    }

    const id = await createDocument<Branch>(COLLECTION, data);
    const newBranch: Branch = {
      ...data,
      id: Number.isNaN(Number(id)) ? 0 : Number(id), // Convert Firestore ID safely
    };
    return newBranch;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw new Error("Failed to create branch");
  }
};

// ✅ Get all branches
export const getBranches = async (): Promise<Branch[]> => {
  try {
    const snapshot = await getDocuments(COLLECTION);
    const branches: Branch[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Branch, "id">;
      return {
        ...data,
        id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
      };
    });
    return branches;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw new Error("Failed to fetch branches");
  }
};

// ✅ Get branch by ID
export const getBranchById = async (id: string): Promise<Branch | null> => {
  try {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc || !doc.exists) return null;

    const data = doc.data() as Omit<Branch, "id">;
    return {
      ...data,
      id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
    };
  } catch (error) {
    console.error("Error fetching branch:", error);
    throw new Error("Failed to fetch branch");
  }
};

// ✅ Update branch
export const updateBranch = async (
  id: string,
  updates: Partial<Omit<Branch, "id">>
): Promise<Branch | null> => {
  try {
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error("No fields provided for update");
    }

    await updateDocument<Branch>(COLLECTION, id, updates);
    const updatedDoc = await getDocumentById(COLLECTION, id);
    if (!updatedDoc || !updatedDoc.exists) return null;

    const updatedData = updatedDoc.data() as Omit<Branch, "id">;
    return {
      ...updatedData,
      id: Number.isNaN(Number(updatedDoc.id)) ? 0 : Number(updatedDoc.id),
    };
  } catch (error) {
    console.error("Error updating branch:", error);
    throw new Error("Failed to update branch");
  }
};

// ✅ Delete branch
export const deleteBranch = async (id: string): Promise<boolean> => {
  try {
    await deleteDocument(COLLECTION, id);
    return true;
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw new Error("Failed to delete branch");
  }
};
