import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
  },
  { strict: true }
);

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", userSchema);
