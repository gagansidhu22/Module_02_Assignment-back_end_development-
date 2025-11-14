import { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/RequestValidation";
import { createBranchSchema, updateBranchSchema,deleteBranchSchema } from "../validation/branchValidation";
const router = Router(); 
// Example: Get all branches
/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateBranch'
 */
router.get("/", branchController.getBranches);

// Example: Create a new branch
/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranch'
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *       '400':
 *         description: Invalid branch data
 */

router.post("/", validateRequest(createBranchSchema), branchController.createBranch);
// Example: Get branch by ID
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Retrieve a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the branch
 *     responses:
 *       '200':
 *         description: Branch details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranch'
 *       '404':
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);

// Example: Update a branch
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update branch details by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBranch'
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *       '404':
 *         description: Branch not found
 */
router.put("/:id", validateRequest(updateBranchSchema), branchController.updateBranch);

// Example: Delete a branch
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Branch deleted successfully
 *       '404':
 *         description: Branch not found
 */
router.delete("/:id", validateRequest(deleteBranchSchema,"params"),branchController.deleteBranch);

export default router;