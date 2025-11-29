import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/lib/validation";
import { hashPassword } from "@/utils/hash";
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = SignUpSchema.safeParse(body);

        if (!parsed.success) {
            return new Response(
                JSON.stringify({ error: parsed.error.issues[0].message }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const { name, email, password } = parsed.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "user already exists" }),
                { status: 409, headers: { "Content-Type": "application/json" } }
            );
        }

        const hashed = await hashPassword(password);

        const user = await prisma.user.create({ data: { name, email, password: hashed } });
        const payload = {
            message: "user signUp success",
            user: { id: user.id, name: user.name, email: user.email },
        };

        return new Response(JSON.stringify(payload), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}