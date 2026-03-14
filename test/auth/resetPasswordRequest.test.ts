import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";

describe("POST /auth/reset-password-request", () => {
  it("should send a password reset request", async () => {
    const email = "fakelogin@fake.com";

    const response = await request(app)
      .post("/auth/reset-password-request")
      .send({ email });

    expect(response.status).toBe(200);
  });
});
