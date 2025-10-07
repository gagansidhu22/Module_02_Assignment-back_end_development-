// import
import Joi from "joi";

export const branchSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(5).max(200).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});








