import { beforeEach, vi, describe, it, expect } from "vitest";
import { registerUserRequestHandler } from "../../src/features/auth/handlers/registerUserHandler";
import createNewUser from "../../src/features/auth/services/register/createNewUser";
import signJWT from "../../src/features/auth/services/common/signJWT";
import sendVerificationEmail from "../../src/features/auth/utils/sendVerificationEmail";
import User from "../../src/schemas/User";
import { mockRequest, mockResponse } from "../utils/mockExpress";
import { RegisterRequestDTO } from "../../src/features/auth/authDTOs";

vi.mock("../../src/schemas/User");
vi.mock("../../src/features/auth/services/register/createNewUser");
vi.mock("../../src/features/auth/services/common/signJWT");
vi.mock("../../src/features/auth/utils/sendVerificationEmail");
vi.mock("../../src/features/auth/authDTOMappers", () => ({
  toRegisterDTO: (body: RegisterRequestDTO) => body
}));

describe("Test user registration cases", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should create a new user", async () => {
        vi.mocked(User.findOne).mockResolvedValue(null);
        vi.mocked(createNewUser).mockResolvedValue({_id: "12345", toBeConfirmedEmail: "abdallah@example.com"} as any);
        vi.mocked(signJWT).mockResolvedValue("fake-jwt-token");
        vi.mocked(sendVerificationEmail).mockResolvedValue();

        const request = mockRequest({name: "Abdallah", toBeConfirmedEmail: "abdallah@example.com", preferredLanguage: "en", password: "123Abc456Def"});
        const response = mockResponse();

        await registerUserRequestHandler(request as any, response);

    });
})
