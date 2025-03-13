"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Add-product.module.css";

export default function AddProduct({ productId }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load product details if editing
  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setPreview(data.image);
        })
        .catch((err) => console.error("Failed to load product", err));
    }
  }, [productId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        `/api/products${productId ? `/${productId}` : ""}`,
        {
          method: productId ? "PUT" : "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert(`Product ${productId ? "updated" : "added"} successfully!`);
        router.push("/api/products");
      } else {
        alert("Failed to save product.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        router.push("/api/products");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{productId ? "Edit Product" : "Add New Product"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Product Image</label>
          <input type="file" id="image" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="Preview" className={styles.imagePreview} />
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading
            ? productId
              ? "Updating..."
              : "Adding..."
            : productId
            ? "Update Product"
            : "Add Product"}
        </button>

        {productId && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Product"}
          </button>
        )}
      </form>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./Add-product.module.css";

// export default function AddProduct({ productId }) {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [products, setProducts] = useState([]); // State to store existing products

//   // Load product details if editing
//   useEffect(() => {
//     if (productId) {
//       fetch(`/api/products/${productId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setName(data.name);
//           setDescription(data.description);
//           setPrice(data.price);
//           setPreview(data.image);
//         })
//         .catch((err) => console.error("Failed to load product", err));
//     }
//   }, [productId]);

//   // Fetch existing products
//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Failed to fetch products", err));
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     if (image) formData.append("image", image);

//     try {
//       const response = await fetch(
//         `/api/products${productId ? `/${productId}` : ""}`,
//         {
//           method: productId ? "PUT" : "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         alert(`Product ${productId ? "updated" : "added"} successfully!`);
//         router.push("/products"); // Redirect to the products page
//       } else {
//         alert("Failed to save product.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Product deleted successfully!");
//         // Refresh the product list after deletion
//         setProducts(products.filter((product) => product._id !== id));
//       } else {
//         alert("Failed to delete product.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>{productId ? "Edit Product" : "Add New Product"}</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Product Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="image">Product Image</label>
//           <input type="file" id="image" onChange={handleImageChange} />
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
//             ? productId
//               ? "Updating..."
//               : "Adding..."
//             : productId
//             ? "Update Product"
//             : "Add Product"}
//         </button>

//         {productId && (
//           <button
//             type="button"
//             className={styles.deleteButton}
//             onClick={() => handleDelete(productId)}
//             disabled={isLoading}
//           >
//             {isLoading ? "Deleting..." : "Delete Product"}
//           </button>
//         )}
//       </form>

//       {/* Table to display existing products */}
//       <h2>Existing Products</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product._id}>
//               <td>{product.name}</td>
//               <td>{product.description}</td>
//               <td>${product.price}</td>
//               <td>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className={styles.productImage}
//                 />
//               </td>
//               <td>
//                 <button
//                   onClick={() => router.push(`/products/${product._id}`)}
//                   className={styles.editButton}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className={styles.deleteButton}
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
