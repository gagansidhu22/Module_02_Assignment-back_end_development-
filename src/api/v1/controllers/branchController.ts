// src/api/v1/controllers/branchController.ts
import { Request, Response } from "express";
import * as branchService from "../services/branchService";

export const getBranches = (_req: Request, res: Response) => {
  res.json(branchService.getAllBranches());
};

export const getBranch = (req: Request, res: Response) => {
  const branch = branchService.getBranchById(Number(req.params.id));
  if (!branch) return res.status(404).send("Branch not found");
  res.json(branch);
};

export const createBranch = (req: Request, res: Response) => {
  const newBranch = branchService.addBranch(req.body);
  res.status(201).json(newBranch);
};

export const updateBranch = (req: Request, res: Response) => {
  const updated = branchService.updateBranch(Number(req.params.id), req.body);
  if (!updated) return res.status(404).send("Branch not found");
  res.json(updated);
};

export const deleteBranch = (req: Request, res: Response) => {
  const deleted = branchService.deleteBranch(Number(req.params.id));
  if (!deleted) return res.status(404).send("Branch not found");
  res.status(204).send();
};
