import { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/RequestValidation";
import { createBranchSchema, updateBranchSchema,deleteBranchSchema } from "../validation/branchValidation";
const router = Router(); 

router.post("/:id", validateRequest(createBranchSchema), branchController.createBranch);
router.get("/:id", branchController.getBranches);
router.get("/:id", branchController.getBranchById);
router.put("/:id", validateRequest(updateBranchSchema), branchController.updateBranch);
router.delete("/:id", validateRequest(deleteBranchSchema,"params"),branchController.deleteBranch);

export default router;