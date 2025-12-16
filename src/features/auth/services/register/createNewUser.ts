import * as argon2 from "argon2";
import { RegisterRequestDTO } from "../../authDTOs";
import Subscription from "../../../../schemas/Subscription";
import { getCurrencyFromIP } from "../../../../utils/currency";
import User from "../../../../schemas/User";

const createNewUser = async (
  registerCredentialsDTO: RegisterRequestDTO,
  deviceIPv6: string
) => {
  const hashedPassword = await argon2.hash(registerCredentialsDTO.password);
  const freePlan = await Subscription.findOne({ name: "Free" });

  if (!freePlan) throw new Error("Free subscription plan not found");

  const currencySymbol = getCurrencyFromIP(deviceIPv6);

  const newUser = await User.create({
    name: registerCredentialsDTO.name,
    toBeConfirmedEmail: registerCredentialsDTO.toBeConfirmedEmail,
    birthDate: registerCredentialsDTO.birthDate,
    preferredLanguage: registerCredentialsDTO.preferredLanguage,
    subscription: freePlan._id,
    currency: currencySymbol,
    password: hashedPassword,
  });

  return newUser;
};

export default createNewUser;
