import { NextResponse } from "next/server";
import multer from "multer";
import { read, utils } from "xlsx"; // Use named imports
import { addProduct } from "@/lib/db";

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  // Use multer to handle file upload
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return NextResponse.json(
        { error: "File upload failed" },
        { status: 500 }
      );
    }

    const file = req.file;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    try {
      // Parse the Excel file
      const workbook = read(file.buffer, { type: "buffer" }); // Use `read` instead of `xlsx.read`
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(sheet); // Use `utils.sheet_to_json`

      // Save products to the database
      for (const row of data) {
        await addProduct(row);
      }

      return NextResponse.json(
        { message: "Products imported successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Import error:", error);
      return NextResponse.json(
        { error: "Failed to import products" },
        { status: 500 }
      );
    }
  });
}
