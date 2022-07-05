import express from "express";
import { validationResult } from "express-validator";
import { taskController } from "../controller/taskContoller";
import { createTaskValidator } from "../validator/createTaskValidator";
import { tokenValidator } from "../validator/tokenValidator";
const router = express.Router();

router.post(
  "/",
  tokenValidator,
  [createTaskValidator],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.statusCode = 400;
      next(errors);
    }
    try {
      const taskDetails = await taskController.create(req.body, req.userId);
      res.json(taskDetails).status(201);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", tokenValidator, async (req, res, next) => {
  try {
    const data = await taskController.findByUserId(req.userId);
    res.json(data).status(201);
  } catch (e) {
    next(e);
  }
});

export default router;
