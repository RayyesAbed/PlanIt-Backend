import loadSecrets from "../../../configs/loadSecrets";
import enProviderType from "../provider/enProviderType";

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_CLIENT_SECRET,
} = loadSecrets();

const callbackService = async (code: string, providerType: string) => {
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
};

export default callbackService;
