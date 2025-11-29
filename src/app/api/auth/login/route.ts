import { generateToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SignInSchema } from "@/lib/validation";
import { comparePassword } from "@/utils/hash";
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = SignInSchema.safeParse(body);

        if (!parsed.success) {
            return new Response(
                JSON.stringify({ error: parsed.error.issues[0].message }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return new Response(
                JSON.stringify({ error: "Invalid email" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return new Response(
                JSON.stringify({ error: "Invalid Password" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const token = generateToken(user.id);

        const maxAge = 60 * 60 * 24 * 7;
        const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
        const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}${secureFlag}`;

        return new Response(
            JSON.stringify({
                message: "login success",
                user: { id: user.id, name: user.name, email: user.email },
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": cookie,
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}