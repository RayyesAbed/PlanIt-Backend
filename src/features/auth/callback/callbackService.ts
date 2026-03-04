import loadSecrets from "../../../configs/loadSecrets";
import IUser from "../../../interfaces/IUser";
import Subscription from "../../../schemas/Subscription";
import User from "../../../schemas/User";
import { getCurrencyFromIP } from "../../../utils/currency";
import enProviderType from "../provider/enProviderType";
import signJWT from "../services/common/signJWT";
import GoogleUserProfile from "./types/GoogleUserProfile";

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_CLIENT_SECRET,
} = loadSecrets();

const callbackService = async (
  code: string,
  providerType: string,
  deviceIPv6: string,
) => {
  let OAuthClientID = "";
  let OAuthRedirectURI = "";
  let OAuthClientSecret = "";

  if (providerType == enProviderType.GOOGLE) {
    OAuthClientID = GOOGLE_OAUTH_CLIENT_ID;
    OAuthRedirectURI = GOOGLE_OAUTH_REDIRECT_URI;
    OAuthClientSecret = GOOGLE_OAUTH_CLIENT_SECRET;
  }

  const params = new URLSearchParams({
    code,
    client_id: OAuthClientID,
    client_secret: OAuthClientSecret,
    redirect_uri: OAuthRedirectURI,
    grant_type: "authorization_code",
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  const userResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  const user: GoogleUserProfile = await userResponse.json();

  const doesUserExist = await User.findOne({ confirmedEmail: user.email });

  if (!doesUserExist) {
    const freePlan = await Subscription.findOne({ name: "Free" });

    if (!freePlan) throw new Error("Free subscription plan not found");

    const currencySymbol = getCurrencyFromIP(deviceIPv6);

    const newUser = (await User.create({
      name: user.name,
      provider: "google",
      providerId: user.sub,
      picture: user.picture,
      confirmedEmail: user.email,
      preferredLanguage: "en",
      currency: currencySymbol,
      subscription: freePlan._id,
    })) as IUser;

    const { token, jti } = signJWT(newUser, "login", newUser._id, 3600);
  }
};

export default callbackService;
