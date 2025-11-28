import { Request, Response } from "express";
import { vi } from "vitest";

export function mockRequest(body: any): Partial<Request> {
  return { body };
}

