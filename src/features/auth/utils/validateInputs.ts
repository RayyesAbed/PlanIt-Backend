import { Request } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../../../errors/BadRequestError";

const validateInputs = (req: Request) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError("Invalid request data", errors.array());
  }
};

export default validateInputs;
