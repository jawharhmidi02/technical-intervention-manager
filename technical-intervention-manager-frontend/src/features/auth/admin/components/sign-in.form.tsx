"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { SignInFormData, signInSchema } from "../types/auth.types";

export function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data);
      if (response) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Sign In</CardTitle>
        <CardDescription>Sign in to your admin account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
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
