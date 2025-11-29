import {z} from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "password must be atlast 6 characters")
})

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6)
})

export type SignInInput = z.infer<typeof SignInSchema>;

export const UpdateUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email("Invalid email")
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;