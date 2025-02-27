import { hashPassword, addUser } from "@/lib/db";

export async function POST(request) {
  const { name, email, password } = await request.json();
  const hashedPassword = await hashPassword(password);
  addUser(name, email, hashedPassword);
  return new Response(JSON.stringify({ message: "Registration successful!" }), {
    headers: { "Content-Type": "application/json" },
  });
}
