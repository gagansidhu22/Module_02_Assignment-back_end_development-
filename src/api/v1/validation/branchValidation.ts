// import
import Joi from "joi";

// create branch validation
export const createBranchSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(5).max(200).required(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).required(),

});

// update branch validation
export const updateBranchSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  address: Joi.string().min(5).max(200),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
});


// delete branch validation
export const deleteBranchSchema = Joi.object({
  id: Joi.string().required(),
});





