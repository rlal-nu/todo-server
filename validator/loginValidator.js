import { check } from "express-validator";

export const loginValidator = [
  check(
    "email",
    "email is a required field and should be a valid email"
  ).isEmail(),
  check("password", "Password should be of particular format").isLength({min: 1}),
];
