"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function ViewUser() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8001/api/users/${id}`);
      setUser(result.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching user", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">User Detail</h1>

      <table className="table table-zebra w-auto border">
        <tbody>
          <tr>
            <th className="py-3 px-6 text-right">ID</th>
            <td className="py-3 px-6">{user.id}</td>
          </tr>
          <tr>
            <th className="py-3 px-6 text-right">Name</th>
            <td className="py-3 px-6">{user.name}</td>
          </tr>
          <tr>
            <th className="py-3 px-6 text-right">Email</th>
            <td className="py-3 px-6">{user.email}</td>
          </tr>
          <tr>
            <th className="py-3 px-6 text-right">Created At</th>
            <td className="py-3 px-6">{user.created_at}</td>
          </tr>
        </tbody>
      </table>

      <button className="btn btn-primary mt-6" onClick={() => router.push("/")}>
        Back
      </button>
    </div>
  );
}
