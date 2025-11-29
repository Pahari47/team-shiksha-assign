import { generateToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SignInSchema } from "@/lib/validation";
import { comparePassword } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = SignInSchema.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json(
                {error: parsed.error.issues[0].message},
                {status: 400}
            )
        } 

        const {email, password} = parsed.data;

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user) {
            return NextResponse.json(
                {error: "Invalid email"},
                {status: 401}
            )
        }

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            return NextResponse.json(
                {error: "Invalid Password"},
                {status: 401}
            )
        }

        const token = generateToken(user.id);

        const res = NextResponse.json({
            message: "login success",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        })

        return res;
    } catch (error) {
        return NextResponse.json(
            { error: "Internal error" },
            { status: 500 }
        );
    }
}