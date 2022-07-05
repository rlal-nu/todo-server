import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password")) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, null, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", userSchema);
