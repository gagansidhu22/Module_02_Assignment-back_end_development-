import { Router } from "express";
import * as branchController from "../controllers/branchController";

const router = Router();

router.post("/", branchController.createBranch);
router.get("/", branchController.getBranches);
router.get("/:id", branchController.getBranchById);
router.put("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;
