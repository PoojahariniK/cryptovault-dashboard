import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getMe, updateUsername, changePassword } from "../services/profile.service";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Username form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* Password form */
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm();

  const newPassword = watch("newPassword");
  const oldPassword = watch("oldPassword");

  /* Fetch user */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
        reset({ username: data.username });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [reset]);

  /* Update username */
  const onUpdateName = async (data) => {
    try {
      await updateUsername(data.username);
      toast.success("Username updated. Please log in again to see changes.");
      setUser({ ...user, username: data.username });
    } catch {
      toast.error("Failed to update username");
    }
  };

  /* Change password */
  const onChangePassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (data.oldPassword === data.newPassword) {
      toast.error("New password cannot be the same as the current password");
      return;
    }

    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated. Please log in again.");
      resetPasswordForm();
    } catch (err) {
      toast.error(err.response?.data?.error || "Password change failed");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <main className="px-8 py-10 max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* Account Information */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Account Information</h2>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              value={user.email}
              disabled
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm opacity-70"
            />
          </div>

          <form onSubmit={handleSubmit(onUpdateName)} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Username</label>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
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

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-background rounded-lg font-medium"
            >
              Update Username
            </button>
          </form>
        </section>

        {/* Change Password */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <form
            onSubmit={handlePasswordSubmit(onChangePassword)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm mb-2">Current Password</label>
              <input
                type="password"
                {...registerPassword("oldPassword", {
                  required: "Old password is required",
                })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none"
              />
              {passwordErrors.oldPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {passwordErrors.oldPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">New Password</label>
              <input
                type="password"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none"
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">Confirm New Password</label>
              <input
                type="password"
                {...registerPassword("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none"
              />
              {passwordErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-background rounded-lg font-medium"
            >
              Change Password
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
