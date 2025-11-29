export const dynamic = "force-dynamic";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
      <Link href="/" className="text-xl font-semibold text-gray-900">
        My App
      </Link>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link
              href="/sign-in"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>

            <form action="/api/auth/logout" method="POST">
              <button className="text-red-500 hover:text-red-700 transition-colors">
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}
