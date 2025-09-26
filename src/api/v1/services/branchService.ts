interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}

let branches: Branch[] = [];
let nextId = Date.now();

export const createBranch = (data: Omit<Branch, "id">): Branch => {
  const branch: Branch = { id: nextId++, ...data };
  branches.push(branch);
  return branch;
};

export const getBranches = (): Branch[] => {
  return branches;
};

export const getBranchById = (id: number): Branch | undefined => {
  return branches.find((b) => b.id === id);
};

export const updateBranch = (id: number, updates: Partial<Omit<Branch, "id">>): Branch | null => {
  const branch = branches.find((b) => b.id === id);
  if (!branch) return null;

  Object.assign(branch, updates);
  return branch;
};

export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
};
