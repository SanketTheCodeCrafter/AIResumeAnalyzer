import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../validation/auth.validation";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { cn } from "../utils/cn";

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, authState } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password", "");

  const calculateStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(score, 4);
  };

  const strength = calculateStrength(passwordValue);

  const getStrengthColor = (s) => {
    if (s === 0) return "bg-muted";
    if (s === 1) return "bg-destructive";
    if (s === 2) return "bg-orange-500";
    if (s === 3) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (s) => {
    if (s === 0) return "";
    if (s === 1) return "Weak";
    if (s === 2) return "Fair";
    if (s === 3) return "Good";
    return "Strong";
  };

  const onSubmit = async (data) => {
    const result = await registerUser({
      username: data.username.trim(),
      email: data.email.toLowerCase(),
      password: data.password,
    });

    if (result.success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Join to start analyzing your resume intelligently."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Username Field */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="johndoe"
            {...register("username")}
            className={cn(errors.username && "border-destructive focus-visible:ring-destructive/50")}
          />
          <AnimatePresence>
            {errors.username && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.username.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

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
          <Label htmlFor="password">Password</Label>
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
          
          {/* Strength Indicator */}
          {passwordValue.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pt-1"
            >
              <div className="flex gap-1 h-1.5 w-full mb-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "h-full w-full rounded-full transition-colors duration-300",
                      strength >= level ? getStrengthColor(strength) : "bg-muted"
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-semibold text-muted-foreground">
                <span>{getStrengthText(strength)}</span>
                {strength === 4 && <Check className="h-3 w-3 text-emerald-500" />}
              </div>
            </motion.div>
          )}

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

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={cn(
                "pr-10", 
                errors.confirmPassword && "border-destructive focus-visible:ring-destructive/50"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.confirmPassword && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </AnimatePresence>
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
          className="w-full mt-2" 
          isLoading={authState.isSubmitting}
        >
          Create account
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-primary hover:text-primary/80 font-medium transition-colors focus:outline-none focus:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
