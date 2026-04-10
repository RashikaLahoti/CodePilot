import jwt from "jsonwebtoken";
import { success, created } from "./response.util.js";
import envVariables from "../config/config.env.js";

export const sendTokens = (user, statusCode, res) => {
  const accessToken = jwt.sign(
    { userId: user._id, name: user.name },
    envVariables.jwtsecretkey,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    { userId: user._id, name: user.name },
    envVariables.refreshtokensecret,
    { expiresIn: "7d" },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  if (statusCode === 201) {
    return created(res, { user: { name: user.name } });
  }
  return success(res, { user: { name: user.name } });
};

export const sendAccessToken = (res, user) => {
  const accessToken = jwt.sign(
    { userId: user.userId, name: user.name },
    envVariables.jwtsecretkey,
    { expiresIn: "15m" },
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  return success(res, { message: "Access token refreshed" });
};