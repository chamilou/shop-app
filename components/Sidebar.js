//
import styles from "./Sidebar.module.css";
import { useRouter } from "next/navigation";

export default function Sidebar({ onNavigate }) {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li onClick={() => onNavigate("dashboard")} className={styles.link}>
            Dashboard
          </li>
          {/* <li onClick={() => onNavigate("add-product")} className={styles.link}>
            Add Product
          </li> */}
          <li
            onClick={() => onNavigate("manage-products")}
            className={styles.link}
          >
            Manage Products
          </li>
          <li
            onClick={() => onNavigate("manage-users")}
            className={styles.link}
          >
            Manage Users
          </li>
        </ul>
      </nav>
    </div>
  );
}
