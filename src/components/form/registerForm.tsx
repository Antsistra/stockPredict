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
import { useNavigate } from "react-router-dom";

const registerFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirmation password is required"),
    name: z.string().nonempty("Name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterFormSchema = z.infer<typeof registerFormSchema>;

function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (value) => {
    setLoading(true);
    try {
      // Cek apakah email sudah ada di tabel users
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("*")
        .eq("email", value.email)
        .single();

      if (existingUser) {
        // Jika user sudah ada, tampilkan pesan error
        Swal.fire({
          icon: "error",
          title: "Signup failed",
          text: "User already exists",
        });
      } else if (checkError && checkError.code !== "PGRST116") {
        // Jika ada error selain user tidak ditemukan
        console.error("Error checking user:", checkError.message);
        Swal.fire({
          icon: "error",
          title: "Signup failed",
          text: "An error occurred while checking user existence.",
        });
      } else {
        // Jika user belum ada, lakukan sign up ke Supabase Auth
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: value.email,
            password: value.password,
          });

        if (signUpError) {
          // Jika terjadi error saat sign up
          console.error("Error signing up:", signUpError.message);
          Swal.fire({
            icon: "error",
            title: "Signup failed",
            text: signUpError.message,
          });
        } else {
          // Jika sign up berhasil, masukkan data ke tabel users
          const userId = signUpData.user?.id; // Ambil ID user dari Supabase Auth
          const { error: insertError } = await supabase.from("users").insert({
            id: userId,
            email: value.email,
            name: value.name,
          });

          if (insertError) {
            // Jika terjadi error saat insert ke tabel users
            console.error("Error inserting user:", insertError.message);
            Swal.fire({
              icon: "error",
              title: "Signup failed",
              text: "An error occurred while saving user data.",
            });
          } else {
            // Jika semua berhasil
            Swal.fire({
              icon: "success",
              title: "Signup successful",
              text: "Please check your email for a confirmation link.",
            }).then(() => {
              navigate("/"); // Redirect ke halaman utama
            });
          }
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  });
  // const onSubmit = handleSubmit(async (value) => {
  //   setLoading(true);
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email: value.email,
  //       password: value.password,
  //     });

  //     if (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Signup failed",
  //         text: error.message,
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Signup successful",
  //         text: "Please check your email for a confirmation link.",
  //         showCancelButton: true,
  //       }).then(() => {
  //         navigate("/");
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     alert("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // });
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
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
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
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirmation Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full hover:cursor-pointer">
              Register
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

export default RegisterForm;
