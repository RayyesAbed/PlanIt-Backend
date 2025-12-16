import { Response } from "express";
import HttpError from "../../../errors/HttpError";

export default function handleControllerError(error: unknown, res: Response) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  console.error("Unexpected error:", error);

  return res.status(500).json({
    message: "Internal server error",
  });
}
