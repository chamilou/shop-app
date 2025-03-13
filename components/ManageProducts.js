// "use client";
// import { useEffect, useState } from "react";
// import styles from "./ManageProducts.module.css";

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: "",
//   });

//   // Fetch products on component mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("/api/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to load products. Please try again.");
//     }
//   };

//   // Handle input changes for editing products
//   const handleInputChange = (id, field, value) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id ? { ...product, [field]: value } : product
//       )
//     );
//   };

//   // Save changes to a product
//   const handleSave = async (product) => {
//     try {
//       const response = await fetch(`/api/products/${product.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       });

//       if (!response.ok) throw new Error("Failed to update product");
//       alert("Product updated successfully!");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("An error occurred while updating the product.");
//     }
//   };

//   const handleDelete = async (id) => {
//     console.log("Attempting to delete product ID:", id); // Debugging log

//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });

//       const result = await response.json(); // Get response details
//       console.log("Delete Response:", result);

//       if (!response.ok) {
//         alert("Failed to delete product: " + result.message);
//         return;
//       }

//       setProducts((prev) => prev.filter((p) => p.id !== id));
//       alert("Product deleted successfully!");
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Error deleting product.");
//     }
//   };

//   // Add a new product
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price) {
//       alert("Please enter a product name and price.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });

//       if (!response.ok) throw new Error("Failed to add product");

//       const addedProduct = await response.json();
//       setProducts([...products, addedProduct]);
//       setNewProduct({ name: "", price: "", image: "" }); // Reset form
//       alert("Product added successfully!");
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("An error occurred while adding the product.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.h1}>Manage Products</h1>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Description</th>
//             <th>Name</th>
//             <th>Price ($)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <input
//                   type="text"
//                   value={product.image}
//                   onChange={(e) =>
//                     handleInputChange(product.id, "image", e.target.value)
//                   }
//                   placeholder="Image URL"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={product.description}
//                   onChange={(e) =>
//                     handleInputChange(product.id, "description", e.target.value)
//                   }
//                   placeholder="Description"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={product.name}
//                   onChange={(e) =>
//                     handleInputChange(product.id, "name", e.target.value)
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={product.price}
//                   onChange={(e) =>
//                     handleInputChange(product.id, "price", e.target.value)
//                   }
//                 />
//               </td>
//               <td>
//                 <button onClick={() => handleSave(product)}>Save</button>
//                 <button onClick={() => handleDelete(product.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//           {/* Add Product Row */}
//           <tr>
//             <td>
//               <input
//                 type="text"
//                 value={newProduct.image}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, image: e.target.value })
//                 }
//                 placeholder="Image URL"
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={newProduct.description}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, description: e.target.value })
//                 }
//                 placeholder="description"
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={newProduct.name}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, name: e.target.value })
//                 }
//                 placeholder="New Product Name"
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 value={newProduct.price}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, price: e.target.value })
//                 }
//                 placeholder="Price"
//               />
//             </td>
//             <td>
//               <button onClick={handleAddProduct}>Add</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import styles from "./ManageProducts.module.css";
import Image from "next/image";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [useFilePicker, setUseFilePicker] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products. Please try again.");
    }
  };

  const handleInputChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleSave = async (product) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to update product");
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        alert("Failed to delete product: " + result.message);
        return;
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product.");
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter a product name and price.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);

      if (useFilePicker && imageFile) {
        formData.append("image", imageFile); // Ensure the field name is "image"
      } else if (!useFilePicker && newProduct.image) {
        formData.append("image", newProduct.image); // Fallback to URL if file picker is not used
      } else {
        alert("Please provide an image.");
        return;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData, // No need to set Content-Type header
      });

      if (!response.ok) throw new Error("Failed to add product");

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: "", price: "", image: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Manage Products</h1>
      <button className={styles.button} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Product"}
      </button>
      {showForm && (
        <div className={styles.formContainer}>
          <h2>Add New Product</h2>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price ($)</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={useFilePicker}
                onChange={() => setUseFilePicker(!useFilePicker)}
              />
              Use File Picker
            </label>
            {useFilePicker ? (
              <>
                <input type="file" onChange={handleImageChange} />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    width="100"
                    height="50"
                  />
                )}
              </>
            ) : (
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                placeholder="Image URL"
              />
            )}
          </div>
          <button className={styles.button} onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Name</th>
            <th>Price ($)</th>
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
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    No Image
                  </div>
                )}
              </td>
              <td>{product.description}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleSave(product)}>Save</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
