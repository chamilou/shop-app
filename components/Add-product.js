// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./Add-product.module.css";

// export default function AddProductPage() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

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
//     formData.append("image", image);

//     try {
//       const response = await fetch("/api/products", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         alert("Product added successfully!");
//         router.push("/admin");
//       } else {
//         alert(result.error || "Failed to add product.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Add New Product</h1>
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
//           <input type="file" id="image" onChange={handleImageChange} required />
//           {preview && (
//             <img src={preview} alt="Preview" className={styles.imagePreview} />
//           )}
//         </div>
//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={isLoading}
//         >
//           {isLoading ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "./Add-product.module.css";

// export default function AddProductPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id"); // Get product ID from URL if editing

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // **Load product details if editing**
//   useEffect(() => {
//     if (productId) {
//       fetch(`/api/products/${productId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setName(data.name);
//           setDescription(data.description);
//           setPrice(data.price);
//           setPreview(data.image); // Assuming the API returns an image URL
//         })
//         .catch((err) => console.error("Failed to load product", err));
//     }
//   }, [productId]);

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

//       const result = await response.json();
//       if (response.ok) {
//         alert(`Product ${productId ? "updated" : "added"} successfully!`);
//         router.push("/admin");
//       } else {
//         alert(result.error || "Failed to save product.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/products/${productId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Product deleted successfully!");
//         router.push("/admin");
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
//             onClick={handleDelete}
//             disabled={isLoading}
//           >
//             {isLoading ? "Deleting..." : "Delete Product"}
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }
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
        router.push("/admin/manage-products");
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
        router.push("/admin/manage-products");
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
