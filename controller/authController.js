import mongoose from "mongoose";
import "../models/Users";
import jwt from "jsonwebtoken";
import { ApplicationError } from "../utils/applicationError";
var UserModel = mongoose.model("User");

export const authController = {};

authController.register = async (data) => {
  return new UserModel({
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    secondName: data.secondName
  }).save();
};

authController.login = async (data) => {
  const userData = await UserModel.findOne({
    email: data.email,
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const validationResult = await userData.validatePassword(data.password);
  if (validationResult) {
    const token = await authController.generateJwtToken(userData.toObject());
    return { token };
  } else {
    throw new ApplicationError("Wrong username password", 401);

  }
};

authController.generateJwtToken = async (data) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
