"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await handleLogin(email, password);

    if (!success) {
      setError("Invalid credentials");
      return;
    }

    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={submitLogin} className="card bg-base-100 p-8 shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full">
          Sign In
        </button>
      </form>
    </div>
  );
}
