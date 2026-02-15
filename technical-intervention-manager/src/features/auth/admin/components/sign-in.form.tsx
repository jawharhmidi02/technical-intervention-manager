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
import { signIn } from "../api/auth.api";
import { SignInFormData } from "../types/auth.types";

export function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState<SignInFormData>({
    email: "",
    password: "",
    role: "admin",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn(form);
    if (response) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/admin/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Sign In</CardTitle>
        <CardDescription>Sign in to your admin account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Sign In
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline text-foreground">
              Sign Up
            </Link>
          </p>
          <Link href="/technicien" className="w-full">
            <Button type="button" variant="outline" className="w-full">
              Login as Technicien
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
