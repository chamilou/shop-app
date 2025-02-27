//
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import styles from "../../lib/auth.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        login(result.user); // Update the user state
        localStorage.setItem("token", result.token); // Save token
        localStorage.setItem("user", JSON.stringify(result.user)); // Save user data

        // Redirect based on user role
        if (result.user.role === "admin") {
          router.push("/admin"); // Redirect to admin dashboard
        } else {
          router.push("/"); // Redirect to home page for regular users
        }
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
      <div className={styles.link}>
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
}
