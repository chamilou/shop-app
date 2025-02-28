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
  const formData = await request.formData();
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
    await addProduct(name, description, imageUrl, price); // Ensure addProduct is asynchronous

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
  const products = getProducts(); // Make sure getProducts is asynchronous
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

// PUT request to update a product
export async function PUT(request) {
  const formData = await request.formData();
  const id = formData.get("id"); // Ensure the product ID is sent
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
      // const buffer = Buffer.from(bytes);
      const buffer = Buffer.from(await image.arrayBuffer());

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
  return new Response(JSON.stringify({ message: "Product deleted" }), {
    headers: { "Content-Type": "application/json" },
  });
}
// DELETE request to delete a product
// export async function DELETE(request) {
//   const { id } = await request.json(); // Assuming the ID is sent in the request body

//   if (!id) {
//     return new Response(JSON.stringify({ error: "Product ID is required" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   try {
//     await deleteProduct(id); // Delete the product from the database
//     return new Response(
//       JSON.stringify({ message: "Product deleted successfully" }),
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to delete product" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
