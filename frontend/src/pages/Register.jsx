import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import  toast  from "react-hot-toast";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
const [serverError, setServerError] = useState("");
const [loading, setLoading] = useState(false);

const onSubmit = async (data) => {
  try {
    setLoading(true);
    setServerError("");

    await registerUser(data);

    toast.success("Account created successfully");

    navigate("/signin");
  } catch (error) {
    const message =
      error.response?.data?.error || "Registration failed";

    setServerError(message);
    toast.error(message);
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted mt-2">
            Start tracking your crypto holdings
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="cryptotrader"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className={`w-full bg-background border rounded-lg px-4 py-3 text-sm outline-none
                ${errors.username ? "border-red-500" : "border-border"}
                focus:border-primary`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "Password must be at least 8 characters and include uppercase, lowercase, and a number",
                  },
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

            <p className="text-muted text-xs mt-2">
              Min 8 chars, with uppercase, lowercase, and number
            </p>

            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-background font-semibold hover:bg-opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
