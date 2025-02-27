"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import styles from "./Navbar.module.css";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useUser();
  const { itemCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">My App</Link>
      </div>
      <div className={styles.links}>
        {/* Cart Link (always visible) */}
        <Link href="/cart" className={styles.cartLink}>
          <span className={styles.cartLink}>Cart({itemCount})</span>
        </Link>

        {/* Conditional rendering for Login/Register or Logout */}
        {user ? (
          <>
            {user && user.role === "admin" && (
              <Link href="/admin/" className={styles.link}>
                Admin Dashboard
              </Link>
            )}
            <span className={styles.welcome}>Welcome, {user.name}</span>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
            <Link href="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
