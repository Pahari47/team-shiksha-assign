"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, UpdateUserInput } from "@/lib/validation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";

export default function EditForm({ user }: { user: any }) {
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function onSubmit(data: UpdateUserInput) {
    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setMsg("Profile updated!");
    } else {
      setMsg("Update failed");
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>

      {msg && <p className="text-green-600 mb-2">{msg}</p>}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" loading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
