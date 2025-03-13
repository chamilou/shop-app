// import { NextResponse } from "next/server";
// import { unlink } from "fs/promises"; // Import unlink for deleting files
// import { join } from "path";
// import { deleteProduct, getProductById } from "@/lib/db";

// export async function DELETE(request, { params }) {
//   const { id } = params;
//   console.log("Deleting product with ID:", id);

//   try {
//     // Fetch the product to get the image URL
//     const product = await getProductById(id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Delete the image file from the server
//     if (product.imageUrl) {
//       const imageUrlWithoutLeadingSlash = product.imageUrl.startsWith("/")
//         ? product.imageUrl.slice(1)
//         : product.imageUrl;

//       const imagePath = join(
//         process.cwd(),
//         "public",
//         imageUrlWithoutLeadingSlash
//       );
//       console.log("Deleting image at path:", imagePath);

//       try {
//         await unlink(imagePath);
//         console.log("Image deleted successfully");
//       } catch (error) {
//         console.error("Error deleting image:", error);
//       }
//     }

//     // Delete the product from the database
//     await deleteProduct(id);

//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { deleteProduct } from "@/lib/db";

// export async function DELETE(request, { params }) {
//   const { id } = params;

//   // Debugging: Log the ID
//   console.log("Deleting product with ID:", id);

//   if (!id) {
//     return NextResponse.json(
//       { error: "Product ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const deletedProduct = await deleteProduct(id);
//     if (!deletedProduct) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { deleteProduct, getProductById } from "@/lib/db";
// import { unlink } from "fs/promises";
// import { join } from "path";

// export async function DELETE(request, { params }) {
//   const { id } = params;

//   // Debugging: Log the ID
//   console.log("Deleting product with ID:", id);

//   if (!id) {
//     return NextResponse.json(
//       { error: "Product ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch the product to get the image URL
//     const product = await getProductById(id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Delete the image file from the server
//     if (product.imageUrl) {
//       const imageUrlWithoutLeadingSlash = product.imageUrl.startsWith("/")
//         ? product.imageUrl.slice(1)
//         : product.imageUrl;

//       const imagePath = join(
//         process.cwd(),
//         "public",
//         imageUrlWithoutLeadingSlash
//       );
//       console.log("Deleting image at path:", imagePath);

//       try {
//         await unlink(imagePath);
//         console.log("Image deleted successfully");
//       } catch (error) {
//         console.error("Error deleting image:", error);
//       }
//     }

//     // Delete the product from the database
//     await deleteProduct(id);

//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }
// app/api/products/[id]/route.js
// import { NextResponse } from "next/server";
// import { deleteProduct, getProductById } from "@/lib/db";
// import { unlink } from "fs/promises";
// import { join } from "path";

// export async function DELETE(request, { params }) {
//   const { id } = params; // Ensure id is being destructured from params correctly

//   // Debugging: Log the ID
//   console.log("Deleting product with ID:", id);

//   if (!id) {
//     return NextResponse.json(
//       { error: "Product ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch the product to get the image URL
//     const product = await getProductById(id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Delete the image file from the server
//     if (product.imageUrl) {
//       const imageUrlWithoutLeadingSlash = product.imageUrl.startsWith("/")
//         ? product.imageUrl.slice(1)
//         : product.imageUrl;

//       const imagePath = join(
//         process.cwd(),
//         "public",
//         imageUrlWithoutLeadingSlash
//       );
//       console.log("Deleting image at path:", imagePath);

//       try {
//         await unlink(imagePath);
//         console.log("Image deleted successfully");
//       } catch (error) {
//         console.error("Error deleting image:", error);
//       }
//     }

//     // Delete the product from the database
//     await deleteProduct(id);

//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { deleteProduct, getProductById } from "@/lib/db";
import { unlink } from "fs/promises";
import { join } from "path";

// export async function DELETE(request, { params }) {
//   const { id } = params;

//   if (!id) {
//     return NextResponse.json(
//       { error: "Product ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch the product to get the image URL
//     const product = await getProductById(id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Delete the image file from the server
//     if (product.imageUrl) {
//       const imageUrlWithoutLeadingSlash = product.imageUrl.startsWith("/")
//         ? product.imageUrl.slice(1)
//         : product.imageUrl;

//       const imagePath = join(
//         process.cwd(),
//         "public",
//         imageUrlWithoutLeadingSlash
//       );
//       console.log("Deleting image at path:", imagePath);

//       try {
//         await unlink(imagePath);
//         console.log("Image deleted successfully");
//       } catch (error) {
//         console.error("Error deleting image:", error);
//       }
//     }

//     // Delete the product from the database
//     await deleteProduct(id);

//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(request, { params }) {
  try {
    // Extract the `id` from `params`
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Delete the product from the database
    await deleteProduct(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { deleteProduct, getProductById } from "@/lib/db";
// import { unlink } from "fs/promises";
// import { join } from "path";

// export async function DELETE(request, { params }) {
//   const { id } = params;

//   if (!id) {
//     return NextResponse.json(
//       { error: "Product ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch the product to get the image URL
//     const product = await getProductById(id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Delete the image file from the server
//     if (product.imageUrl) {
//       const imageUrlWithoutLeadingSlash = product.imageUrl.startsWith("/")
//         ? product.imageUrl.slice(1)
//         : product.imageUrl;

//       const imagePath = join(
//         process.cwd(),
//         "public",
//         imageUrlWithoutLeadingSlash
//       );
//       console.log("Deleting image at path:", imagePath);

//       try {
//         await unlink(imagePath);
//         console.log("Image deleted successfully");
//       } catch (error) {
//         console.error("Error deleting image:", error);
//       }
//     }

//     // Delete the product from the database
//     await deleteProduct(id);

//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }
