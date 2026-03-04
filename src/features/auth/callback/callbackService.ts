import loadSecrets from "../../../configs/loadSecrets";

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_CLIENT_SECRET,
} = loadSecrets();

const callbackService = (code: string, providerType: string) => {
  let OAuthClientID = "";
  let OAuthRedirectURI = "";
  let OAuthClientSecret = "";
};

export default callbackService;
