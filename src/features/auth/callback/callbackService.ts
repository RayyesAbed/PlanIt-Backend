import loadSecrets from "../../../configs/loadSecrets";
import enProviderType from "../provider/enProviderType";

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_CLIENT_SECRET,
} = loadSecrets();

const callbackService = (code: string, providerType: string) => {
  let OAuthClientID = "";
  let OAuthRedirectURI = "";
  let OAuthClientSecret = "";

  if (providerType == enProviderType.GOOGLE) {
    OAuthClientID = GOOGLE_OAUTH_CLIENT_ID;
    OAuthRedirectURI = GOOGLE_OAUTH_REDIRECT_URI;
    OAuthClientSecret = GOOGLE_OAUTH_CLIENT_SECRET;
  }
};

export default callbackService;
