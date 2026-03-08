import enProviderType from "./enProviderType";
import loadSecrets from "../../../configs/loadSecrets";
import * as client from "openid-client";

const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT_URI } = loadSecrets();

const providerService = async (providerType: string) => {
  const state = crypto.randomUUID();

  const codeVerifier = client.randomPKCECodeVerifier();
  const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);

  if (providerType == enProviderType.GOOGLE) {
    return (
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${GOOGLE_OAUTH_CLIENT_ID}` +
      `&redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}` +
      "&response_type=code" +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256` +
      `&state=${state}` +
      "&scope=openid email profile"
    );
  } else if (providerType == enProviderType.APPLE) {
    return; // TODO: I will update OAuthLink with Apple when I enroll in Apple Developer Program
  }
};

export default providerService;
