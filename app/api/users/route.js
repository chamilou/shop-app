import { addUser, hashPassword, getUsers } from "@/lib/db";

export async function POST(request) {
  const { name, email, password, role } = await request.json();
  const hashedPassword = await hashPassword(password);
  addUser(name, email, hashedPassword, role);
  return new Response(JSON.stringify({ message: "User added successfully" }), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function GET() {
  const users = getUsers();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}
