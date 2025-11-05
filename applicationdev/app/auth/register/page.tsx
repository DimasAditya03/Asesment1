"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/register", form);

      localStorage.setItem("token", res.data.token);

      router.push("/auth/login");
    } catch (err: any) {
      setError("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full mb-3"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-3"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-3"
            onChange={handleChange}
          />

          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirm password"
            className="input input-bordered w-full mb-3"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
}
