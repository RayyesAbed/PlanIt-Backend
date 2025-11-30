import AppSecrets from "../types/AppSecrets";

function assertEnv(varName: string): string {
  const value = process.env[varName];
  if (!value) throw new Error(`Missing environment variable: ${varName}`);
  return value;
}

/**
 * Loads and parses secrets from .env file.
 * @returns {AppSecrets} Parsed secret values.
 */
const loadSecrets = (): AppSecrets => {};

export default loadSecrets;
