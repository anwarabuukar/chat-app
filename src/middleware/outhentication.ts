import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { jwtAudience, jwtIssuer, jwtSecret } from "../config";

export const authmiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader){ return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.replace("Bearer ", "");
  const decoded = Jwt.verify(token, jwtSecret, {
    audience: jwtAudience ,
    issuer: jwtIssuer ,
  });

  req.payload = decoded as JwtPayload;

  next();
};