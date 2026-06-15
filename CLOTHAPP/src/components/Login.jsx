 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useAuth } from "../Context/Authcontext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender via-white to-blush px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl animate-scale-in">
        <button
          onClick={() => navigate("/")}
          className="float-right text-gray-400 transition hover:text-ebony"
          aria-label="Close login page"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-center">
          <h2 className="bg-gradient-to-r from-electric to-coral bg-clip-text text-3xl font-black text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-rose/20 p-2 text-sm text-rose">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-electric"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-electric"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-coral py-3 font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          New here?{" "}
          <Link to="/signup" className="font-bold text-coral">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
