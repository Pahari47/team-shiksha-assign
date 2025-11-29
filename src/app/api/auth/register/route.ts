import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/lib/validation";
import { hashPassword } from "@/utils/hash";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    
    try {
        const body = await req.json();

        const parsed = SignUpSchema.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json(
                {error: parsed.error.issues[0].message},
                {status: 400}
            )
        }

        const {name, email, password} = parsed.data;

        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser) {
            return NextResponse.json(
                {error: "user already exists"},
                {status: 409}
            )
        }

        const hashed = await hashPassword(password);

        const user = await prisma.user.create({
            data: {name, email, password: hashed}
        })

        return NextResponse.json({
            message: "user signUp sucees",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }, {status: 201})
    } catch (error) {
        return NextResponse.json(
            {error: "Internal error"},
            {status: 500}
        )
    }
}