import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
  
      await loginUser(data);
  
      toast.success("Signed in successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-white">

      {/* Back to Home */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="text-sm text-muted hover:text-primary transition"
        >
          ← Back to home
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted mt-2">
            Sign in to access your portfolio
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-sm outline-none
                ${errors.email ? "border-red-500" : "border-border"}
                focus:border-primary`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full bg-background border rounded-lg px-4 py-3 text-sm outline-none pr-16
                  ${errors.password ? "border-red-500" : "border-border"}
                  focus:border-primary`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted hover:text-primary transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-background font-semibold hover:bg-opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
