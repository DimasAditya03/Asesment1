"use client";

import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, handleLogout } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await handleLogout();
    router.push("/auth/login");
  };

  return (
    <div className="navbar bg-base-300 px-6">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
      </div>

      <div className="flex gap-3">
        {/* ✅ Belum login → tampil Sign In + Sign Up */}
        {!user && (
          <>
            <Link href="/auth/login" className="btn btn-sm btn-primary">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn btn-sm">
              Sign Up
            </Link>
          </>
        )}

        {/* ✅ Sudah login → tampil Sign Out */}
        {user && (
          <>
            <button className="btn btn-sm btn-error" onClick={onLogout}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
