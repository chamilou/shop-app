// "use client";

// import { useState, useEffect } from "react";
// import styles from "./Manage-users.module.css";

// export default function ManageUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const response = await fetch("./api/users");
//     const data = await response.json();
//     setUsers(data);
//   };

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     const response = await fetch("./api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     });
//     if (response.ok) {
//       alert("User added successfully!");
//       fetchUsers();
//     } else {
//       alert("Failed to add user");
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     const response = await fetch(`/api/users/${id}`, {
//       method: "DELETE",
//     });
//     if (response.ok) {
//       alert("User deleted successfully!");
//       fetchUsers();
//     } else {
//       alert("Failed to delete user");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Manage Users</h1>

//       {/* Add User Form */}
//       <form onSubmit={handleAddUser} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             value={newUser.name}
//             onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={newUser.password}
//             onChange={(e) =>
//               setNewUser({ ...newUser, password: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="role">Role</label>
//           <select
//             id="role"
//             value={newUser.role}
//             onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//             required
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Add User
//         </button>
//       </form>

//       {/* Users List */}
//       <div className={styles.usersList}>
//         <h2>Users</h2>
//         {users.map((user) => (
//           <div key={user.id} className={styles.userItem}>
//             <span>
//               {user.name} ({user.email}) - {user.role}
//             </span>
//             <button
//               onClick={() => handleDeleteUser(user.id)}
//               className={styles.deleteButton}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import styles from "./ManageProducts.module.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");

  // Fetch products on component mount
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

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter a product name and price.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    if (newProduct.image) formData.append("image", newProduct.image);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add product");

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: "", description: "", price: "", image: null });
      setPreview("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit a product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
    });
    setPreview(product.image);
  };

  // Save changes to a product
  const handleSave = async () => {
    if (!editingProduct) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    if (newProduct.image) formData.append("image", newProduct.image);

    try {
      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      setEditingProduct(null);
      setNewProduct({ name: "", description: "", price: "", image: null });
      setPreview("");
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a product
  // const handleDelete = async (id) => {
  //   if (!confirm("Are you sure you want to delete this product?")) return;

  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`/api/products/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) throw new Error("Failed to delete product");

  //     setProducts((prev) => prev.filter((p) => p._id !== id));
  //     alert("Product deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     alert("An error occurred while deleting the product.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        // Correct URL with product ID
        method: "DELETE",
      });

      // Log response for debugging
      const responseData = await response.json();
      console.log("Response from delete:", responseData);

      if (response.ok) {
        alert("Product deleted successfully!");
        // Refresh the product list after deletion
        setProducts(products.filter((product) => product._id !== id));
      } else {
        alert(
          "Failed to delete product. " +
            (responseData.message || "Please try again.")
        );
      }
    } catch (error) {
      console.error("An error occurred while deleting:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Manage Products</h1>

      {/* Add/Edit Product Form */}
      <div className={styles.formContainer}>
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingProduct ? handleSave() : handleAddProduct();
          }}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Product Image</label>
            <input type="file" id="image" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading
              ? editingProduct
                ? "Saving..."
                : "Adding..."
              : editingProduct
              ? "Save Product"
              : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setNewProduct({
                  name: "",
                  description: "",
                  price: "",
                  image: null,
                });
                setPreview("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Product List */}
      <h2>Existing Products</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={`${styles.button} ${styles.edit}`}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
