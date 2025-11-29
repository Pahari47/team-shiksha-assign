"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { SignInInput, SignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";

export default function SignInPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
    } = useForm<SignInInput>({
        resolver: zodResolver(SignInSchema),
    })

    async function onSubmit(data: SignInInput) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data)
        })

        if(res.ok) {
            router.push("/dashboard");
        } else {
            alert("Invalid credentials")
        }
    }
    
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                <Input 
                    label="Email"
                    type="email"
                    placeholder="nachiketapahari00@gmail.com"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <Input 
                    label="Password"
                    type="password"
                    placeholder="xxxxx"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <Button type="submit" loading={isSubmitting}>Sign In</Button>
            </form>
        </>
    )
}