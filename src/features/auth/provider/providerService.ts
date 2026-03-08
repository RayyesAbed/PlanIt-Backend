import enProviderType from "./enProviderType";
import loadSecrets from "../../../configs/loadSecrets";

const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT_URI } = loadSecrets();

const providerService = (providerType: string) => {
  const state = crypto.randomUUID();

  if (providerType == enProviderType.GOOGLE) {
    return (
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${GOOGLE_OAUTH_CLIENT_ID}` +
      `&redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}` +
      "&response_type=code" +
      "&scope=openid email profile"
    );
  } else if (providerType == enProviderType.APPLE) {
    return; // TODO: I will update OAuthLink with Apple when I enroll in Apple Developer Program
  }
};

export default providerService;
