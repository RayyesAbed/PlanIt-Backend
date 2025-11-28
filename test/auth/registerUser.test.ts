import { beforeEach, vi, describe, it, afterEach } from "vitest";
import { registerUserRequestHandler } from "../../src/features/auth/handlers/registerUserHandler";
import User from "../../src/schemas/User";

vi.mock("../../src/schemas/User");
