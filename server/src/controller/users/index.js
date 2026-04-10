import {
  badRequest,
  internalServerError,
  success,
} from "../../utils/response.util.js";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendTokens } from "../../utils/auth.util.js";
import envVariables from "../../config/config.env.js";

export const registerUserController = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return badRequest(res, { message: "All fields are required" });
    }

    let userExists = await User.findOne({ email });
    if (userExists) {
      return badRequest(res, { message: "User already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPass });

    sendTokens(user, 201, res);
  } catch (error) {
    return internalServerError(res, { message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return badRequest(res, { message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return badRequest(res, { message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return badRequest(res, { message: "Invalid credendials" });
    }

    sendTokens(user, 200, res)
  } catch (error) {
    return internalServerError(res, { message: error.message });
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return customError(res, {}, 401, "Token is required");
  }

  try {
    const payload = jwt.verify(refreshToken, envVariables.refreshtokensecret);
    sendAccessToken(res, payload);
  } catch (error) {
    return customError(res, {}, 403, "Invalid refresh token");
  }
};
