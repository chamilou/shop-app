import React from "react";
import styles from "./Contact.module.css";
import ProductImportExport from "@/components/ui/export-import/ProductImportExport";

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Contact Us</h1>
      <form
        className={styles.form}
        name="contact"
        method="POST"
        data-netlify="true"
      >
        <div>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className={styles.label}>
            Message:
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            name="message"
            required
          ></textarea>
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>

      <ProductImportExport />
    </div>
  );
};

export default ContactPage;
/* Contact.module.css */
