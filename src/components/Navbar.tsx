import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 border-b">
      <Link href="/" className="text-xl font-semibold">
        My App
      </Link>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>

            <form action="/api/auth/logout" method="POST">
              <button className="text-red-600 hover:underline">
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}
