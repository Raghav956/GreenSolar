import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import { loginAdmin } from "../services/authService";
import toast from "react-hot-toast";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",
    });

  async function handleLogin(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await loginAdmin(formData);

      localStorage.setItem(
        "greensolar_token",
        response.access_token
      );

      navigate("/admin");

    } catch (error) {

      toast.success("Invalid Credentials");

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="min-h-screen bg-[#050816] overflow-hidden">

      <Navbar />

      {/* GLOW */}

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* CONTENT */}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          className="w-full max-w-lg backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-10"
        >

          <h1 className="text-5xl font-bold text-white text-center">

            Admin Login

          </h1>

          <p className="text-gray-400 text-center mt-6">

            Secure access to GreenSolar dashboard.

          </p>

          <form
            onSubmit={handleLogin}
            className="mt-12 space-y-6"
          >

            <input

              type="email"

              placeholder="Email"

              value={formData.email}

              onChange={(e) =>
                setFormData({

                  ...formData,

                  email: e.target.value,
                })
              }

              className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <input

              type="password"

              placeholder="Password"

              value={formData.password}

              onChange={(e) =>
                setFormData({

                  ...formData,

                  password: e.target.value,
                })
              }

              className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <button

              type="submit"

              disabled={loading}

              className="w-full py-5 rounded-2xl bg-cyan-400 text-black font-bold text-lg"
            >

              {loading
                ? "Signing In..."
                : "Login"}

            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}