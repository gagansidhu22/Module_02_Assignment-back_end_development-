// import
import Joi from "joi";

// create branch validation
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBranch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           description: Address of the branch
 *           example: "123 Main Street, Winnipeg"
 *         phone:
 *           type: string
 *           pattern: "^[0-9\\-]+$"
 *           description: Phone number of the branch
 *           example: "204-555-1234"
 */

export const createBranchSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(5).max(200).required(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).required(),

});

// update branch validation
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBranch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Updated name of the branch
 *           example: "Westside Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           description: Updated address of the branch
 *           example: "456 Portage Avenue, Winnipeg"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{10}$"
 *           description: Updated phone number (10 digits)
 *           example: "2045559876"
 */
export const updateBranchSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  address: Joi.string().min(5).max(200),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
});


// delete branch validation
/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteBranch:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the branch to delete
 *           example: "branch_12345"
 */
export const deleteBranchSchema = Joi.object({
  id: Joi.string().required(),
});





