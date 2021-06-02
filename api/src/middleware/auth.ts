const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization;
    const decodedToken: { userId: string } = jwt.verify(
      token,
      process.env.JWTKEY
    );
    const userId: number = parseInt(decodedToken.userId, 10);
    const paramId: number = parseInt(req.params.id, 10);

    if (paramId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
