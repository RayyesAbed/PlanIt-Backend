import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";
import createTestUser from "../utils/createTestUser";
import signJWT from "../../src/features/auth/services/common/signJWT";
import setRedisKey from "../../src/features/auth/services/common/setRedisKey";

describe("POST /auth/verify-email", () => {
  it("should verify a user email with a valid token", async () => {
    const user = await createTestUser();
    const payload = signJWT(user, "email-verification-test", user._id, 600);

    await setRedisKey(payload.jti, "false", 600);
    const response = await request(app).post(
      `/auth/verify-email?token=${payload.token}`,
    );

    expect(response.status).toBe(200);
  });

  it("should throw a 401 error when verifying with an invalid JWT token", async () => {
    const invalidToken = "invalid_token";

    const response = await request(app).post(
      `/auth/verify-email?token=${invalidToken}`,
    );

    expect(response.status).toBe(401);
  });
});
