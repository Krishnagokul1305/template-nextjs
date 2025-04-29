"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { signInSchema } from "../lib/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInAction } from "../lib/action";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await signInAction(data);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          register={register("email")}
          error={errors.email}
          disabled={isSubmitting}
        />
        <InputField
          id="password"
          label="Password"
          placeholder={"********"}
          type="password"
          register={register("password")}
          error={errors.password}
          disabled={isSubmitting}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
