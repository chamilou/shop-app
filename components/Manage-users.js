"use client";

import { useState, useEffect } from "react";
import styles from "./Manage-users.module.css";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("./api/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const response = await fetch("./api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      alert("User added successfully!");
      fetchUsers();
    } else {
      alert("Failed to add user");
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("User deleted successfully!");
      fetchUsers();
    } else {
      alert("Failed to delete user");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Users</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Add User
        </button>
      </form>

      {/* Users List */}
      <div className={styles.usersList}>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <span>
              {user.name} ({user.email}) - {user.role}
            </span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
