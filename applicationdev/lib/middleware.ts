import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const token = request.headers.get("Cookie")?.includes("token");

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.some((r) => request.url.includes(r))) {
    if (!token)
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
