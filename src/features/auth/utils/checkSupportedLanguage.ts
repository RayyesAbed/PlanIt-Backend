import { BadRequestError } from "../../../errors/BadRequestError";
import supportedLanguages from "../../../resources/languages/supportedLanguages";

const checkSupportedLanguage = (preferredLanguage: string) => {
  if (!supportedLanguages.includes(preferredLanguage)) {
    throw new BadRequestError("Preferred language currently not supported");
  }
};

export default checkSupportedLanguage;
