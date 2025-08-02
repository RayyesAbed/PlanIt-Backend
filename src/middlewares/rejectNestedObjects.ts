import { Request, Response, NextFunction } from "express";

const rejectNestedObjects = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const containsObject = (value: unknown) => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };

  for (const key in req.body) {
    if (containsObject(req.body[key])) {
      res.status(400).json({ error: "Invalid input!" });
      return;
    }
  }

  next();
};

export default rejectNestedObjects;
