import { NextResponse } from "next/server";
import { utils, write } from "xlsx"; // Use named imports
import { getProducts } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Fetch products from the database
    const products = await getProducts();

    // Create a new workbook and worksheet
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(products);
    utils.book_append_sheet(workbook, worksheet, "Products");

    // Generate Excel file buffer
    const buffer = write(workbook, { type: "buffer", bookType: "xlsx" }); // Use `write` instead of `xlsx.write`

    // Set response headers for file download
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="products.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export products" },
      { status: 500 }
    );
  }
}
