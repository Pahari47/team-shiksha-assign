import { getCurrentUser } from "@/lib/auth";
import EditForm from "./EditForm";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <p className="text-center mt-20">Unauthorized</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <EditForm user={user} />
    </div>
  );
}
