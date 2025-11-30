import { Request, Response } from "express";
import { vi } from "vitest";

export const mockRequest = (body = {}) => ({
  body,
  params: {},
  query: {},
  headers: {},
  ip: "::1"
});

export function mockResponse(): Response {
  const res = {} as Response;

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res;
}