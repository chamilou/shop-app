"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (token && userData) {
      setUser(userData);
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Save token to localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear the token from localStorage
    localStorage.removeItem("user"); // Clear the user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
const login = (userData) => {
  // Add isAdmin property if not provided by the backend
  const userWithRole = { ...userData, isAdmin: userData.role === "admin" };
  setUser(userWithRole);
  localStorage.setItem("token", userWithRole.token);
  localStorage.setItem("user", JSON.stringify(userWithRole));
};
