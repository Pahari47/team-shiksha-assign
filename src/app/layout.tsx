export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Team shiksa assignment",
  description: "norm project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-gray-50"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
