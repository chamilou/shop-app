"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ManageProducts.module.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("./api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id)); // Remove product from state
          alert("Product deleted successfully!");
        } else {
          alert("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Products</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className={styles.productImage}
                  />
                ) : (
                  <span>No Image Available</span>
                )}
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button
                  onClick={() =>
                    router.push(`/admin/add-product?id=${product.id}`)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./ManageProducts.module.css";

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch("./api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Failed to load products", err));
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1>Manage Products</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={50} // Set a specific width
//                   height={50} // Set a specific height
//                   className={styles.productImage}
//                 ></Image>
//               </td>
//               <td>{product.name}</td>
//               <td>${product.price}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     router.push(`/admin/add-product?id=${product.id}`)
//                   }
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() =>
//                     fetch(`/api/products/${product.id}`, {
//                       method: "DELETE",
//                     }).then(() => window.location.reload())
//                   }
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./ManageProducts.module.css";

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch("./api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Failed to load products", err));
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1>Manage Products</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>${product.price}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     router.push(`/admin/add-product?id=${product.id}`)
//                   }
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() =>
//                     fetch(`/api/products/${product.id}`, {
//                       method: "DELETE",
//                     }).then(() => window.location.reload())
//                   }
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./ManageProducts.module.css";

// export default function ManageProducts() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: null,
//   });
//   const [preview, setPreview] = useState("");

//   // Fetch products
//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         console.log("Data fetched:", data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products", err);
//         setIsLoading(false);
//       });
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, image: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Handle add or edit submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     if (form.image) formData.append("image", form.image);

//     try {
//       const response = await fetch(
//         `/api/products${editingProduct ? `/${editingProduct.id}` : ""}`,
//         {
//           method: editingProduct ? "PUT" : "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         alert(`Product ${editingProduct ? "updated" : "added"} successfully!`);
//         setEditingProduct(null); // Reset editing state
//         setForm({ name: "", description: "", price: "", image: null });
//         setPreview("");
//         fetchProducts(); // Refresh product list
//       } else {
//         alert("Failed to save product.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch products again after add/edit
//   const fetchProducts = () => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Failed to fetch products", err));
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

//       if (response.ok) {
//         alert("Product deleted successfully!");
//         setProducts(products.filter((product) => product.id !== id));
//       } else {
//         alert("Failed to delete product.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Start editing a product
//   const startEditing = (product) => {
//     setEditingProduct(product);
//     setForm({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       image: null,
//     });
//     setPreview(product.image); // Assuming product.image contains the URL
//   };

//   return (
//     <div className={styles.container}>
//       <h1>{editingProduct ? "Edit Product" : "Add New Product"}</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label>Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Price</label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Product Image</label>
//           <input type="file" onChange={handleImageChange} />
//           {preview && (
//             <img src={preview} alt="Preview" className={styles.imagePreview} />
//           )}
//         </div>
//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={isLoading}
//         >
//           {isLoading
//             ? editingProduct
//               ? "Updating..."
//               : "Adding..."
//             : editingProduct
//             ? "Update Product"
//             : "Add Product"}
//         </button>
//         {editingProduct && (
//           <button
//             type="button"
//             onClick={() => setEditingProduct(null)}
//             className={styles.cancelButton}
//           >
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       <h2>Existing Products</h2>
//       {isLoading ? (
//         <p>Loading products...</p>
//       ) : products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <ul className={styles.productList}>
//           {products.map((product) => (
//             <li key={product.id} className={styles.productItem}>
//               <div>
//                 <strong>{product.name}</strong> - ${product.price}
//               </div>
//               <div>
//                 <button
//                   onClick={() => startEditing(product)}
//                   className={styles.editButton}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product.id)}
//                   className={styles.deleteButton}
//                   disabled={isLoading}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
