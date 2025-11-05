// lib/auth.ts
import api from "./axios";

export async function login(email: string, password: string) {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    const { user, token } = res.data;

    // simpan token ke localStorage
    if (token) {
      localStorage.setItem("token", token);
    }

    return { user, token };
  } catch (err: any) {
    console.error("Login error:", err.response?.data || err);
    return null;
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("token");
  }
}
