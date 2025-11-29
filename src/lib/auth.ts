import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {prisma} from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "pahari4322";

export function generateToken(userId: string) {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: "7D"});
}

export function verifyToken(token: string): {userId: string} {
    return jwt.verify(token, JWT_SECRET) as {userId: string};
}

export async function getCurrentUser() {
    try {
        const token = (await cookies()).get("token")?.value;

        if(!token) return null;

        const decoded = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: {id: decoded.userId}
        })

        return user;
    } catch (error) {
        return null;
    }
}


export async function requireAuth() {
    const user = await getCurrentUser();
    if(!user) {
        throw new Error("unauthorized");
    }
    return user;
}