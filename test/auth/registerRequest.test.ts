import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";

describe("POST /auth/register_request", () => {
  it("should register new users", async () => {
    const response = await request(app).post("/auth/register_request").send({
      name: "Fake",
      toBeConfirmedEmail: "fakeuser@fake.com",
      language: "en",
      password: "test123Test456!",
    });

    expect(response.status).toBe(201);
  });
});
