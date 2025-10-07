import { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/RequestValidation";
import { branchSchema } from "../validation/branchValidation";

const router = Router();

// Create a new branch — validate request body before controller
router.post("/", validateRequest(branchSchema), branchController.createBranch);

// Get all branches
router.get("/", branchController.getBranches);

// Get branch by ID
router.get("/:id", branchController.getBranchById);

// Update branch — also validate request body
router.put("/:id", validateRequest(branchSchema), branchController.updateBranch);

// Delete branch
router.delete("/:id", branchController.deleteBranch);

export default router;
