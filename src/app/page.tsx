import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        A simple authentication and dashboard demo built with Next.js, Prisma, and TailwindCSS.
      </p>

      {!user ? (
        <div className="flex gap-4">
          <Link
            href="/sign-in"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-lg">
            Logged in as <strong>{user.name}</strong>
          </p>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
