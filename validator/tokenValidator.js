import { ApplicationError } from "../utils/applicationError";
import jwt from "jsonwebtoken";

export const tokenValidator = (req, res, next) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      req.userId = verified._id
      return next();
    } else {
      return next(new ApplicationError("Unauthorised", 401));
    }
  } catch (error) {
    return next(new ApplicationError(error, 401));
  }
};
