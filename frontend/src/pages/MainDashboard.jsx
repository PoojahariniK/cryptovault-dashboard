import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getMe } from "../services/auth.service";
import { HiOutlineChartBar,HiOutlineShieldCheck ,HiOutlineLightningBolt} from "react-icons/hi";


function MainDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="px-8 py-16 flex flex-col items-center space-y-16">
        {/* Welcome Section */}
        <section className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold">
            Master Your <span className="text-primary">Crypto Portfolio</span>
          </h1>
          <p className="text-muted mt-6 text-lg md:text-xl">
            Track holdings, monitor real-time valuations, and make informed
            decisions with our powerful portfolio management dashboard.
          </p>
        </section>
       {/* SHOW ONLY IF NOT LOGGED IN */}
       {!loading && !user && (
          <section className="text-center">
            <button
              onClick={() => navigate("/signin")}
              className="mt-6 text-primary font-semibold text-base md:text-lg hover:underline transition"
            >
              Sign in to proceed further
            </button>
          </section>
        )}

        {/* Feature Columns */}
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 mx-auto rounded-lg bg-background flex items-center justify-center mb-6 text-primary text-xl">
            <HiOutlineChartBar className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Live Market Data</h3>
            <p className="text-muted text-sm leading-relaxed">
              Real-time crypto prices fetched from market APIs with automatic
              refresh to keep your portfolio up to date.
            </p>
          </div>

          {/* Column 2 */}
          <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 mx-auto rounded-lg bg-background flex items-center justify-center mb-6 text-primary text-xl">
            <HiOutlineShieldCheck className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Secure Authentication
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              JWT-based authentication with protected routes and secure access
              to your portfolio data.
            </p>
          </div>

          {/* Column 3 */}
          <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 mx-auto rounded-lg bg-background flex items-center justify-center mb-6 text-primary text-xl">
            <HiOutlineLightningBolt className="text-2xl text-primary" />

            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Actions</h3>
            <p className="text-muted text-sm leading-relaxed">
              Add, edit, and remove assets instantly with automatic portfolio
              recalculation.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainDashboard;
