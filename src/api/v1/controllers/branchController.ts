import { Request, Response } from "express";
import * as branchService from "../services/branchService";

// Create branch
export const createBranch = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, address, and phone are required",
      });
    }

    const branch = await branchService.createBranch({ name, address, phone });
    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create branch" });
  }
};

//Get All branches
export const getBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await branchService.getBranches();
    res.status(200).json({
      success: true,
      message: "Branches retrieved successfully",
      data: branches,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve branches" });
  }
};

//Get branch By ID
export const getBranchById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // ✅ keep as string
    const branch = await branchService.getBranchById(id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch retrieved successfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve branch" });
  }
};

//Update Branch
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // ✅ string
    const updates: Record<string, unknown> = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update",
      });
    }

    const allowedFields = ["name", "address", "phone"];
    for (const key of Object.keys(updates)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({
          success: false,
          message: `Invalid field: ${key}`,
        });
      }
      if (typeof updates[key] === "string" && updates[key] === "") {
        return res.status(400).json({
          success: false,
          message: `${key} cannot be empty`,
        });
      }
    }

    const branch = await branchService.updateBranch(id, updates);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch updated successfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update branch" });
  }
};

//Delete Branch
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // ✅ string
    const success = await branchService.deleteBranch(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete branch" });
  }
};
