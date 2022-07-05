import mongoose from "mongoose";
import "../models/Tasks";
// import { ApplicationError } from "../utils/applicationError";
var TaskModel = mongoose.model("Task");

export const taskController = {};

taskController.create = async (data, userId) => {
  return new TaskModel({
    title: data.title,
    description: data.description,
    user: userId,
  }).save();
};

taskController.findByUserId = async (user) => {
  return TaskModel.find({ user });
};
