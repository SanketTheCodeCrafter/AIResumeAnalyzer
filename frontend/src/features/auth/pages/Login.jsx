import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../validation/auth.validation";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { cn } from "../utils/cn";

export default function Login() {
  const navigate = useNavigate();
  const { login, authState } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const result = await login({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    if (result.success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your details to access your workspace."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={cn(errors.email && "border-destructive focus-visible:ring-destructive/50")}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="#" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={cn(
                "pr-10", 
                errors.password && "border-destructive focus-visible:ring-destructive/50"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2 pt-1 pb-2">
          <input
            type="checkbox"
            id="remember"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-primary checked:border-primary checked:after:content-['✓'] checked:after:text-primary-foreground checked:after:text-xs checked:after:flex checked:after:items-center checked:after:justify-center transition-all cursor-pointer bg-background"
          />
          <Label htmlFor="remember" className="font-normal cursor-pointer text-muted-foreground">
            Remember me for 30 days
          </Label>
        </div>

        {/* Global Error */}
        <AnimatePresence>
          {authState.error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{authState.error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          type="submit" 
          className="w-full" 
          isLoading={authState.isSubmitting}
        >
          Sign in
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="text-primary hover:text-primary/80 font-medium transition-colors focus:outline-none focus:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
