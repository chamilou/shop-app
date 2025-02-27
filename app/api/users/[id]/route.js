import { deleteUser } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { id } = params;
  deleteUser(id);
  return new Response(
    JSON.stringify({ message: "User deleted successfully" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
