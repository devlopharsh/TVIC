"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { API } from "@/utils/api";
import { useRouter } from "next/navigation";

// ✅ Zod Schema for Validation
const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      // 👇 Send login request
      const res = await API.post<{ token: string }>("/auth/login", data);

      console.log("Response after login:", res);

      // ✅ Save token if present
      if (res?.token) {
        localStorage.setItem("authToken", res?.token);
        toast.success("Login successful!");
        setTimeout(()=>{
          router.push("/dashboard");
        },200)
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden bg-[#0d0d0d] border border-[#ff9933]/30 text-gray-100 shadow-lg shadow-[#ff9933]/10">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 md:p-8 flex flex-col justify-center"
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center mb-4">
                  <h1 className="text-3xl font-bold text-[#ff9933]">
                    Welcome Back
                  </h1>
                  <p className="text-gray-400">
                    Login to your <span className="text-[#ff9933]">TVIC</span>{" "}
                    account
                  </p>
                </div>

                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-[#1a1a1a] border-[#ff9933]/30 text-white placeholder:text-gray-500 focus:border-[#ff9933]"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </Field>

                {/* Password */}
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm text-[#ff9933] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#1a1a1a] border-[#ff9933]/30 text-white placeholder:text-gray-500 focus:border-[#ff9933]"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#ff9933] hover:bg-[#e68a00] text-black font-semibold mt-2"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Field>

                <FieldSeparator className="text-gray-400 mt-4">
                  Or continue with
                </FieldSeparator>

                {/* Social Login Buttons */}
                <Field className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-[#ff9933]/40 bg-[#1a1a1a] hover:bg-[#ff9933]/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#ff9933]"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="border-[#ff9933]/40 bg-[#1a1a1a] hover:bg-[#ff9933]/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#ff9933]"
                    >
                      <path
                        d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.404.597 24 1.326 24h21.348C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0zM7.09 20.452H3.542V9h3.548v11.452zM5.316 7.452c-1.137 0-2.061-.924-2.061-2.061s.924-2.061 2.061-2.061c1.138 0 2.061.924 2.061 2.061s-.923 2.061-2.061 2.061zM20.452 20.452h-3.547v-5.543c0-1.321-.026-3.023-1.842-3.023-1.842 0-2.123 1.438-2.123 2.923v5.643h-3.548V9h3.406v1.561h.049c.476-.901 1.637-1.85 3.372-1.85 3.605 0 4.27 2.374 4.27 5.462v6.279z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="border-[#ff9933]/40 bg-[#1a1a1a] hover:bg-[#ff9933]/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#ff9933]"
                    >
                      <path
                        d="M23.954 4.569c-.885.392-1.83.654-2.825.775a4.932 4.932 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0016.616 3c-2.737 0-4.958 2.222-4.958 4.958 0 .39.045.765.128 1.124C7.728 8.905 4.1 7.066 1.671 4.149a4.93 4.93 0 00-.666 2.489c0 1.72.875 3.234 2.202 4.122a4.904 4.904 0 01-2.243-.618v.061c0 2.403 1.711 4.405 3.978 4.857a4.935 4.935 0 01-2.236.085c.629 1.959 2.445 3.385 4.6 3.426A9.868 9.868 0 010 19.54 13.942 13.942 0 007.548 21.9c9.057 0 14.01-7.512 14.01-14.009 0-.214-.005-.426-.015-.637A10.012 10.012 0 0024 4.59z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </Field>

                <FieldDescription className="text-center text-gray-400 mt-4">
                  Don’t have an account?{" "}
                  <a href="#" className="text-[#ff9933] hover:underline">
                    Sign up
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>

            {/* Right Side Image */}
            <div className="relative hidden md:block bg-[#1a1a1a]">
              <img
                src="/favicon.svg"
                alt="Login Side"
                className="absolute scale-50 inset-0 h-full w-full z-10"
              />
              <video
                src="/videos/login-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
            </div>
          </CardContent>
        </Card>

        <FieldDescription className="text-center text-gray-500 text-sm mt-4">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-[#ff9933] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#ff9933] hover:underline">
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </div>
    </>
  );
}
