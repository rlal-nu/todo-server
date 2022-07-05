import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  createdDate: { type: String, required: true, default: new Date() },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

mongoose.model("Task", taskSchema);
