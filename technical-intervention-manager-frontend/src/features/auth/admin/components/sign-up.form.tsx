"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { signUp } from "../api/auth.api";
import { SignUpFormData } from "../types/auth.types";

export function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(form);
    router.push("/");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Sign Up</CardTitle>
        <CardDescription>Create your admin account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/" className="underline text-foreground">
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
