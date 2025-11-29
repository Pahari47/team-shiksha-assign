import DashboardPage from "@/app/dashboard/page";
import { getCurrentUser } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  getCurrentUser: jest.fn(),
}));

describe("Dashboard Page Tests", () => {
  test("Shows user data when logged in", async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });

    const html = await DashboardPage();
    expect(html).toBeTruthy();
  });

  test("Renders unauthorized message when user is not logged in", async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(null);

    const html = await DashboardPage();
    expect(JSON.stringify(html)).toContain("Unauthorized");
  });
});
