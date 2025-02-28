// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import styles from "./ManageProducts.module.css";

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: "",
//   });

//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Failed to load products", err));
//   }, []);

//   const handleInputChange = (id, field, value) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id ? { ...product, [field]: value } : product
//       )
//     );
//   };

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
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setProducts(products.filter((product) => product.id !== id));
//         alert("Product deleted successfully!");
//       } else {
//         throw new Error("Failed to delete product");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("An error occurred while deleting the product.");
//     }
//   };

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
//       setNewProduct({ name: "", price: "", image: "" });
//       alert("Product added successfully!");
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("An error occurred while adding the product.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Manage Products</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Image</th>
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

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

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

  // Handle input changes for editing products
  const handleInputChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  // Save changes to a product
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

  // Delete a product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted successfully!");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter a product name and price.");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: "", price: "", image: "" }); // Reset form
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
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
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    handleInputChange(product.id, "image", e.target.value)
                  }
                  placeholder="Image URL"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    handleInputChange(product.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    handleInputChange(product.id, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleSave(product)}>Save</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {/* Add Product Row */}
          <tr>
            <td>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                placeholder="Image URL"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="New Product Name"
              />
            </td>
            <td>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Price"
              />
            </td>
            <td>
              <button onClick={handleAddProduct}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
