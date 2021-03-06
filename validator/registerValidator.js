import { check } from "express-validator";

export const registerValidator = [
  check(
    "email",
    "email is a required field and should be a valid email"
  ).isEmail(),
  check("firstName", "First name is a required field").isLength({ min: 1 }),
  check(
    "password",
    "Password should be of at lease 8 length, should have one uppercase, number and special charecters"
  ).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
];
