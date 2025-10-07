import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  branchId: Joi.number().integer().required(), // ✅ now expects a number
});
