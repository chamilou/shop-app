import { writeFile, unlink } from "fs/promises"; // Import unlink for deleting files
import { join } from "path";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/lib/db"; // Ensure updateProduct and deleteProduct are defined

// POST request to add a product
export async function POST(request) {
  const formData = request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const image = formData.get("image");

  if (!name || !description || !price || !image) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Save the image to the public folder
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imagePath = join(process.cwd(), "public", "media", image.name);
    await writeFile(imagePath, buffer);

    // Add the product to the database
    const imageUrl = `/media/${image.name}`;
    await addProduct(name, description, imageUrl, price);

    return new Response(
      JSON.stringify({ message: "Product added successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET request to fetch all products
export async function GET() {
  try {
    const products = await getProducts(); // Ensure getProducts is asynchronous
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT request to update a product
export async function PUT(request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const image = formData.get("image");
  let imageUrl = null;

  if (!id || !name || !description || !price) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (image) {
      // If a new image is uploaded, save it and get the URL
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imagePath = join(process.cwd(), "public", "media", image.name);
      await writeFile(imagePath, buffer);
      imageUrl = `/media/${image.name}`;
    }

    // Update the product in the database
    await updateProduct(id, { name, description, price, imageUrl });

    return new Response(
      JSON.stringify({ message: "Product updated successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  console.log("Deleting product with ID:", id); // Debugging log

  try {
    // Fetch the product to get the image URL
    const product = await getProductById(id);
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the image file from the server
    if (product.imageUrl) {
      const imageUrlWithoutLeadingSlash = product.imageUrl.startsWith("/")
        ? product.imageUrl.slice(1)
        : product.imageUrl;

      const imagePath = join(
        process.cwd(),
        "public",
        imageUrlWithoutLeadingSlash
      );
      console.log("Deleting image at path:", imagePath); // Debugging log

      try {
        await unlink(imagePath);
        console.log("Image deleted successfully");
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // Delete the product from the database
    await deleteProduct(id);

    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error); // Debugging log
    return new Response(JSON.stringify({ error: "Failed to delete product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
