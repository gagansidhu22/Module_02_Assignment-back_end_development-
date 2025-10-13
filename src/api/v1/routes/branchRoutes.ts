import { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/RequestValidation";
import { createBranchSchema, updateBranchSchema,deleteBranchSchema } from "../validation/branchValidation";
const router = Router(); 

router.post("/", validateRequest(createBranchSchema), branchController.createBranch);
router.get("/", branchController.getBranches);
router.get("/:id", branchController.getBranchById);
router.put("/:id", validateRequest(updateBranchSchema), branchController.updateBranch);
router.delete("/:id", validateRequest(deleteBranchSchema,"params"),branchController.deleteBranch);

export default router;