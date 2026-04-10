import jwt from "jsonwebtoken";
import { success, created } from "./response.util.js";

export const sendTokens = (user, statusCode, res) => {
  const accessToken = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.REFRESH_TOKEN_SECRET,
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
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15m" },
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  return success(res, { message: "Access token refreshed" });
};