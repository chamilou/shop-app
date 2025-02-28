"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react"; // Importing cart icon
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useUser();
  const { itemCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">My App</Link>
      </div>
      <div className={styles.links}>
        {/* Cart Link with Icon */}
        <Link href="/cart" className={styles.cartLink}>
          <ShoppingCart className={styles.cartIcon} size={24} />
          {itemCount > 0 && (
            <span className={styles.cartCount}>{itemCount}</span>
          )}
        </Link>

        {/* Conditional rendering for Login/Register or Logout */}
        {user ? (
          <>
            {user.role === "admin" && (
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
