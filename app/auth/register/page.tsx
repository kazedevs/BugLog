"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Min 3 chars").max(20),
  password: z.string().min(6, "Min 6 chars"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post("/api/register", data);
      router.push("/auth/login?registered=true");
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full" style={{ minHeight: "calc(100vh - 150px)" }}>
      <Card size="3" style={{ width: 350, borderRadius: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div className="flex flex-col gap-y-4 p-2">
          <Heading align="center" size="6" weight="bold">Join BugLog</Heading>
          
          {error && <Text color="red" size="1" align="center">{error}</Text>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-3">
              <div>
                <TextField.Root placeholder="Username" size="2" variant="soft" {...register("username")} />
                {errors.username && <Text color="red" size="1">{errors.username.message}</Text>}
              </div>
              
              <div>
                <TextField.Root type="password" placeholder="Password" size="2" variant="soft" {...register("password")} />
                {errors.password && <Text color="red" size="1">{errors.password.message}</Text>}
              </div>
              
              <Button size="2" variant="solid" color="green" loading={isLoading} className="w-full">
                 Register
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-x-2">
            <div className="flex-1 h-px" style={{ background: "rgba(255, 255, 255, 0.05)" }} />
            <Text color="gray" size="1">or</Text>
            <div className="flex-1 h-px" style={{ background: "rgba(255, 255, 255, 0.05)" }} />
          </div>

          <Button 
            size="2" 
            variant="outline" 
            color="gray" 
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="cursor-pointer"
          >
            <FaGithub /> GitHub
          </Button>

          <Text align="center" size="1">
            <Link href="/auth/login" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
              Already have an account?
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
