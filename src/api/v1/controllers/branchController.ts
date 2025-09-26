import { Request, Response } from "express";
import * as branchService from "../services/branchService";

export const createBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body;

  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Name, address, and phone are required" });
  }

  const branch = branchService.createBranch({ name, address, phone });
  res.status(201).json(branch);
};

export const getBranches = (_req: Request, res: Response) => {
  const branches = branchService.getBranches();
  res.status(200).json(branches);
};

export const getBranchById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const branch = branchService.getBranchById(id);

  if (!branch) {
    return res.status(404).json({ error: "Branch not found" });
  }

  res.status(200).json(branch);
};

export const updateBranch = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const updates: Record<string, unknown> = req.body;

  // Reject empty body
  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({ error: "At least one field must be provided for update" });
    return;
  }

  // Allowed fields
  const allowedFields = ["name", "address", "phone"];

  // Check for invalid keys or empty string values
  for (const key of Object.keys(updates)) {
    if (!allowedFields.includes(key)) {
      res.status(400).json({ error: `Invalid field: ${key}` });
      return;
    }
    if (typeof updates[key] === "string" && updates[key] === "") {
      res.status(400).json({ error: `${key} cannot be empty` });
      return;
    }
  }

  const branch = branchService.updateBranch(id, updates);
  if (!branch) {
    res.status(404).json({ error: "Branch not found" });
    return;
  }

  res.status(200).json(branch);
};

export const deleteBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = branchService.deleteBranch(id);

  if (!success) {
    return res.status(404).json({ error: "Branch not found" });
  }

  res.status(200).json({ message: "Branch deleted successfully" });
};
