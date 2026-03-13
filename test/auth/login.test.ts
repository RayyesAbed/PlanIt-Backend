import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";

describe("POST /auth/login", () => {
  it("should log in existing users", async () => {
    const loginCredentials = {
      email: "fakelogin@fake.com",
      password: "test123Test456!",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginCredentials);

    expect(response.status).toBe(200);
  });
});
