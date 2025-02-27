"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAdminAccess(Component) {
  return function ProtectedComponent(props) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user || user.role !== "admin") {
        router.push("/"); // Redirect to home page if not admin
      }
    }, [user, router]);

    // If the user is not an admin, return null (or a loading spinner)
    if (!user || user.role !== "admin") {
      return null;
    }

    // If the user is an admin, render the component
    return <Component {...props} />;
  };
}
