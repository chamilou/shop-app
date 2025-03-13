"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useUser();
  const { itemCount } = useCart();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.logo}>
        <Link href="/">My App</Link>
      </div>

      <div className={styles.links}>
        <Link href="/products" className={styles.link}>
          Products
        </Link>
        <Link href="/contact" className={styles.link}>
          Contacts
        </Link>

        <Link href="/cart" className={styles.cartLink}>
          <ShoppingCart className={styles.cartIcon} size={24} />
          {itemCount > 0 && (
            <span className={styles.cartCount}>{itemCount}</span>
          )}
        </Link>

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
