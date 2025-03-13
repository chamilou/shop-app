"use client";
import { useState } from "react";
import styles from "./ProductImportExport.module.css";

export default function ProductImportExport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/products/import", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("An error occurred during import.");
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/products/export");
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage("An error occurred during export.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Import/Export Products</h2>

      {/* Import Section */}
      <div className={styles.importSection}>
        <h3>Import Products</h3>
        <div className={styles.fileInput}>
          <label>
            Choose File
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button onClick={handleImport} className={styles.button}>
          Import
        </button>
      </div>

      {/* Export Section */}
      <div className={styles.exportSection}>
        <h3>Export Products</h3>
        <button onClick={handleExport} className={styles.button}>
          Export
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`${styles.message} ${
            message.includes("success") ? styles.success : styles.error
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
