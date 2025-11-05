"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();

  const [userField, setUserField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeUserFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // ✅ Create user
      await axios.post("http://127.0.0.1:8001/api/addnew", userField);

      // ✅ Ambil last_page
      const meta = await axios.get("http://127.0.0.1:8001/api/users?page=1");
      const last = meta.data.results?.last_page ?? 1;

      // ✅ Redirect ke halaman terakhir
      router.push(`/?page=${last}`);
    } catch (err) {
      console.log("Something Wrong", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add New User
        </h1>

        <form onSubmit={onSubmitChange}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered input-primary w-full"
              placeholder="Full Name..."
              onChange={changeUserFieldHandler}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered input-primary w-full"
              placeholder="Email..."
              onChange={changeUserFieldHandler}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input input-bordered input-primary w-full"
              placeholder="Password..."
              onChange={changeUserFieldHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
