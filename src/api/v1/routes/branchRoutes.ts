import express from "express";
import * as branchController from "../controllers/branchController";

const router = express.Router();

router.get("/", branchController.getBranches);
router.get("/:id", branchController.getBranch);
router.post("/", branchController.createBranch);
router.put("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;



