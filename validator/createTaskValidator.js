import { check } from "express-validator";

export const createTaskValidator = [
  check("title", "title is a required field").isLength({ min: 1 }),
  check("description", "description is a required field").isLength({ min: 1 }),
];
