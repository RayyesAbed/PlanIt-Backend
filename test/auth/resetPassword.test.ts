import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";
import signJWT from "../../src/features/auth/services/common/signJWT";
import createTestUser from "../utils/createTestUser";
import setRedisKey from "../../src/features/auth/services/common/setRedisKey";
import User from "../../src/schemas/User";
import * as argon2 from "argon2";

describe("PATCH /auth/reset-password", () => {
  it("should update user's password with their new one", async () => {
    const user = await createTestUser();
    const newPassword = "new123Password!";
    const resetPasswordPayload = signJWT(user, "password-reset", user._id, 600);

    await setRedisKey(resetPasswordPayload.jti, "false", 600);
    const response = await request(app)
      .patch(`/auth/reset-password?token=${resetPasswordPayload.token}`)
      .send({ newPassword });

    expect(response.status).toBe(200);

    const updatedUser = await User.findById(user._id);

    const passwordMatches = await argon2.verify(
      updatedUser?.password!,
      newPassword,
    );

    expect(passwordMatches).toBe(true);
  });
});
