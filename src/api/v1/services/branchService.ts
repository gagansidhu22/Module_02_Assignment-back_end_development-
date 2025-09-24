import { branches, Branch } from "../../../data/branches";

// Get all branches
export const getAllBranches = (): Branch[] => {
  return branches;
};

// Get a branch by ID
export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

// Add a new branch
export const addBranch = (newBranch: Branch): Branch => {
  branches.push(newBranch);
  return newBranch;
};

// Update a branch
export const updateBranch = (id: number, updatedData: Partial<Branch>): Branch | null => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return null;

  branches[index] = { ...branches[index], ...updatedData };
  return branches[index];
};

// Delete a branch
export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;

  branches.splice(index, 1);
  return true;
};
