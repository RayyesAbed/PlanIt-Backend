import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import AppSecrets from "../types/AppSecrets";

const client = new SecretsManagerClient({
  region: process.env.AWS_SECRET_KEYS_REGION,
});

/**
 * Loads and parses secrets from AWS Secrets Manager.
 * @returns {Promise<AppSecrets>} Parsed secret values.
 */
const loadAwsSecrets = async (): Promise<AppSecrets> => {
  const command = new GetSecretValueCommand({
    SecretId: process.env.ARN,
  });

  const response = await client.send(command);

  if (!response.SecretString) throw new Error("Loading secrets failed!");

  const secrets: AppSecrets = JSON.parse(response.SecretString);

  return secrets;
};

export default loadAwsSecrets;
