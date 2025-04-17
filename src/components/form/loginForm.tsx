import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/supabase";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LegisterFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LegisterFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  const { control, handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit(async (value) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "You are now logged in.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  });
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black opacity-50 z-50 flex items-center justify-center"></div>
      )}
      <Form {...form}>
        <form className={cn("flex flex-col gap-6 ")} onSubmit={onSubmit}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to create an account
            </p>
          </div>
          <div className="grid gap-6">
            <FormField
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="lorem@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <h1 className="text-sm text-right">
              <Link to="/forgot-password">Forgot Password?</Link>
            </h1>
            <Button type="submit" className="w-full hover:cursor-pointer">
              Login
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground ">
          Or continue with
        </span>
      </div>
      <Button
        variant="outline"
        className="w-full hover:cursor-pointer mt-4 mb-4"
      >
        <FaGoogle className="mr-2" />
        Login with Google
      </Button>
    </>
  );
}
