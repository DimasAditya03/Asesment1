"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
}

export default function Users() {
  const router = useRouter();
  const search = useSearchParams();
  const initialPage = Number(search.get("page") || "1");

  const [userData, setUserData] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
    per_page: 5,
  });

  useEffect(() => {
    fetchData(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const fetchData = async (page = 1) => {
    const res = await axios.get(`http://127.0.0.1:8001/api/users?page=${page}`);
    setUserData(res.data.results.data);
    setPagination({
      current_page: res.data.results.current_page,
      last_page: res.data.results.last_page,
      per_page: res.data.results.per_page,
    });
  };

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`); // update URL
    fetchData(page); // dan refresh data
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://127.0.0.1:8001/api/users/${id}`);
    // reload current page
    fetchData(pagination.current_page);
  };

  return (
    <div className="mx-auto">
      <table className="table table-zebra table-xs w-auto mx-auto">
        <thead className="text-xs text-gray-600 uppercase bg-gray-50">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Created At</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((rs, index) => (
            <tr key={rs.id} className="bg-white border-b text-sm">
              {/* nomor berurutan per halaman */}
              <td className="py-2 px-4">
                {index +
                  1 +
                  (pagination.current_page - 1) * pagination.per_page}
              </td>
              <td className="py-2 px-4">{rs.name}</td>
              <td className="py-2 px-4">{rs.email}</td>
              <td className="py-2 px-4">{rs.created_at}</td>
              <td className="flex justify-center gap-1 py-2">
                <Link
                  href={`/user/view/${rs.id}`}
                  className="btn btn-info btn-xs"
                >
                  View
                </Link>
                <Link
                  href={`/user/edit/${rs.id}`}
                  className="btn btn-primary btn-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(rs.id)}
                  className="btn btn-secondary btn-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="w-full mt-2 flex justify-end">
        <div className="join">
          <button
            className="join-item btn btn-xs"
            disabled={pagination.current_page === 1}
            onClick={() => goToPage(pagination.current_page - 1)}
          >
            Prev
          </button>

          <button className="join-item btn btn-xs cursor-default">
            Page {pagination.current_page} / {pagination.last_page}
          </button>

          <button
            className="join-item btn btn-xs"
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => goToPage(pagination.current_page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
