import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getMe, logoutUser } from "../services/auth.service";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      setUser(null);
      navigate("/signin");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="border-b border-border px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-xl font-semibold text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        CryptoVault
      </div>

      {/* Right Section */}
      {!loading && (
        <div>
          {!user ? (
            <button
              onClick={() => navigate("/signin")}
              className="text-sm font-medium text-muted hover:text-primary transition"
            >
              Sign in
            </button>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/" className="text-base text-primary">
                Dashboard
              </Link>

              <Link to="/assets" className="text-base text-primary">
                Assets
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 text-base text-primary hover:opacity-90 transition"
              >
                <HiOutlineUserCircle className="text-xl" />
                <span>{user.username}</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-muted hover:text-red-500 transition"
              >
                <HiOutlineLogout className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
