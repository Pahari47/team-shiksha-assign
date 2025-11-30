import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const origin = new URL(req.url).origin;

  const response = NextResponse.redirect(`${origin}/sign-in`);

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
