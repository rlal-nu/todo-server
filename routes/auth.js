import express from "express";
const router = express.Router();
import { validationResult } from "express-validator";
import { authController } from "../controller/authController";
import { registerValidator } from "../validator/registerValidator";

router.post("/register", [registerValidator], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.statusCode = 400
    next(errors)
  }
  try {
    const userDetails = await authController.register(req.body);
    res.json(userDetails).status(201);
  } catch (e) {
    next(e);
  }
});

export default router;
