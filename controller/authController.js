import mongoose from "mongoose";
import "../models/Users";
var userModel = mongoose.model("User");

export const authController = {};

authController.register = async (data) => {
  const abc =  new userModel({
    email: data.email,
    password: data.password,
  }).save();
  return abc;
};
