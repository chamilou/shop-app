// import { findUserByEmail, comparePassword } from "@/lib/db";
// import { generateToken } from "@/lib/auth";

// export async function POST(request) {
//   const { email, password } = await request.json();
//   const user = findUserByEmail(email);
//   if (!user) {
//     return new Response(JSON.stringify({ error: "User not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   const isPasswordValid = await comparePassword(password, user.password);
//   if (!isPasswordValid) {
//     return new Response(JSON.stringify({ error: "Invalid password" }), {
//       status: 401,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   const token = generateToken(user);
//   return new Response(JSON.stringify({ token }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }
import { findUserByEmail, comparePassword } from "@/lib/db";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();
  const user = findUserByEmail(email);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const token = generateToken(user);
  return new Response(JSON.stringify({ user, token }), {
    headers: { "Content-Type": "application/json" },
  });
}
