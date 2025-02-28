"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "@/app/admin/admin.module.css";
import Sidebar from "@/components/Sidebar";
import AddProductPage from "@/components/Add-product";
import ManageUsers from "@/components/Manage-users";
import ManageProducts from "@/components/ManageProducts";

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard"); // Track selected section

  // Redirect if the user is not an admin
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login page if not logged in
    } else if (user.role !== "admin") {
      router.push("/"); // Redirect to home page if not admin
    } else {
      setIsLoading(false); // Allow access if the user is an admin
    }
  }, [user, router]);

  // Show a loading spinner while checking the user's role
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PanelGroup direction="horizontal">
      {/* Sidebar Panel */}
      <Panel defaultSize={20} minSize={15} maxSize={35}>
        <div className={styles.sidebar}>
          <Sidebar onNavigate={(section) => setActiveSection(section)} />
        </div>
      </Panel>

      {/* Resizable Handle */}
      <PanelResizeHandle className={styles.resizer} />

      {/* Main Content Panel */}
      <Panel minSize={65}>
        <div className={styles.mainContent}>
          {activeSection === "dashboard" && (
            <>
              <h1>Admin Dashboard</h1>
              <p>Welcome, Admin! Here you can manage products and users.</p>
            </>
          )}
          {activeSection === "add-product" && <AddProductPage />}
          {activeSection === "manage-users" && <ManageUsers />}
          {activeSection === "manage-products" && <ManageProducts />}
        </div>
      </Panel>
    </PanelGroup>
  );
}
