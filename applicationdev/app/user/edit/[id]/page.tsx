"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface User {
  name: string;
  email: string;
  password?: string;
}

export default function ViewUserPage() {
  const { id } = useParams();

  const [userField, setUserField] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8001/api/users/${id}`);
      console.log(result.data);

      setUserField({
        name: result.data?.name || "",
        email: result.data?.email || "",
        password: "",
      });
    } catch (err) {
      console.log("Something Wrong", err);
    }
  };

  const changeUserFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8001/api/users/${id}`, userField);
      window.location.href = "/";
    } catch (err) {
      console.log("Something Wrong", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Edit User</h1>

        <form
          onSubmit={onSubmitChange}
          className="bg-base-100 shadow-md rounded-xl p-6 border"
        >
          {/* ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              ID
            </label>
            <input
              type="text"
              value={id}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              className="input input-bordered input-primary w-full"
              placeholder="Enter Full Name"
              name="name"
              value={userField.name}
              onChange={changeUserFieldHandler}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered input-primary w-full"
              placeholder="Enter Email"
              name="email"
              value={userField.email}
              onChange={changeUserFieldHandler}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered input-primary w-full"
              placeholder="Enter New Password"
              name="password"
              value={userField.password}
              onChange={changeUserFieldHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
