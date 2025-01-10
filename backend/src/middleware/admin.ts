import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";
import { Request, Response, NextFunction } from "express";

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  const decode = jwt.verify(token as string, JWT_ADMIN_PASSWORD as string);

  if (decode) {
    req.userId = (decode as JwtPayload).id;

    next();
  } else {
    res.json({
      message: "You are not signed in",
    });
  }
}

export default adminMiddleware;
