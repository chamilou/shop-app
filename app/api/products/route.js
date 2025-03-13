import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"; // Import writeFile for saving images
import { join } from "path";
import { addProduct, getProducts, updateProduct } from "@/lib/db";

// POST request to add a product
export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const image = formData.get("image");

  if (!name || !description || !price || !image) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
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

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to add product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// GET request to fetch all products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
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

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
