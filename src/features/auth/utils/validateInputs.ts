import { Request } from "express";
import { validationResult } from "express-validator";

const validateInputs = (req: Request) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.throw();
  }
};

export default validateInputs;
