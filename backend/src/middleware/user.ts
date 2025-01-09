import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_USER_PASSWORD } from "../config";

function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authorization token is missing",
    });
  }

  const decode = jwt.verify(token as string, JWT_USER_PASSWORD as string);

  if (decode) {
    req.userId = (decode as JwtPayload).id;
    next();
  } else {
    res.json({
      message: "You are not signed in",
    });
  }
}

export default userMiddleware;
