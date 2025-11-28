import { Request, Response } from "express";
import { vi } from "vitest";

export function mockRequest(body: any): Partial<Request> {
  return { body };
}

export function mockResponse(): Response {
  const res = {} as Response;

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res;
}