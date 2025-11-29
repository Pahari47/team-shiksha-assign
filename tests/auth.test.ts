import { prisma } from "./__mocks__/prisma";
import { POST as RegisterAPI } from "@/app/api/auth/register/route";
import { POST as LoginAPI } from "@/app/api/auth/login/route";

// FIXED MOCK FOR PRISMA
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: require("./__mocks__/prisma").prisma,
}));

// Mock bcrypt
jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
  compare: jest.fn((plain, hashed) => Promise.resolve(plain === "password123")),
}));

// Mock JWT token
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "fake-jwt-token"),
}));

describe("Auth API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // REGISTER TESTS
  test("Register: Successful registration", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    prisma.user.create.mockResolvedValue({
      id: "1",
      name: "John",
      email: "john@example.com",
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
        password: "password123",
      }),
    });

    const res = await RegisterAPI(req);
    const data = await res.json();

    expect(data.user.email).toBe("john@example.com");
  });

  test("Register: User already exists", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: "1" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
        password: "password123",
      }),
    });

    const res = await RegisterAPI(req);
    expect(res.status).toBe(409);
  });

  // LOGIN TESTS
  test("Login: Successful login", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "1",
      email: "john@example.com",
      password: "hashedPassword",
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: "john@example.com",
        password: "password123",
      }),
    });

    const res = await LoginAPI(req);
    expect(res.status).toBe(200);
  });

  test("Login: Invalid credentials", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "1",
      email: "john@example.com",
      password: "hashedPassword",
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: "john@example.com",
        password: "wrongpass",
      }),
    });

    const res = await LoginAPI(req);
    expect(res.status).toBe(401);
  });
});
