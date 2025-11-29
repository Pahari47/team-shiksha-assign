import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateUserSchema } from "@/lib/validation";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getCurrentUser();

    if(!user) {
        return NextResponse.json(
            {error: "Unautorized"},
            {status: 401}
        )
    }

    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email
    })
}


export async function PUT(req: Request) {
    try {
        const loggedInUser = await getCurrentUser();

        if(!loggedInUser) {
            return NextResponse.json(
                {error: "Unauthorized"},
                {status: 401}
            )
        }

        const body = await req.json();
        const parsed = UpdateUserSchema.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json(
                {error: parsed.error.issues[0].message},
                {status: 400}
            )
        }

        const {name, email} = parsed.data;

        const updateUser = await prisma.user.update({
            where: {id: loggedInUser.id},
            data: {name, email}
        })

        return NextResponse.json({
            message: "profile updated",
            user: {
                id: updateUser.id,
                name: updateUser.name,
                email: updateUser.email
            }
        })
    } catch (error) {
        return NextResponse.json(
            {error: "server error"},
            {status: 500}
        )
    }
}