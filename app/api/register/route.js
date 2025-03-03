// import { hashPassword, addUser } from "@/lib/db";

// export async function POST(request) {
//   const { name, email, password } = await request.json();
//   const hashedPassword = await hashPassword(password);
//   addUser(name, email, hashedPassword);
//   return new Response(JSON.stringify({ message: "Registration successful!" }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// import prisma from "@/lib/prisma";

// export async function POST(request) {
//   const { name, email, password, role } = await request.json();

//   try {
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return new Response(JSON.stringify({ error: "User already exists" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Hash the password (use bcrypt or another library)
//     const hashedPassword = await hashPassword(password);

//     // Create the user
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         role: role || "user", // Default to 'user' if role is not provided
//       },
//     });

//     return new Response(JSON.stringify({ user }), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Registration failed" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { name, email, password } = await request.json();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store the hashed password
        role: "user", // Default role
      },
    });

    return new Response(JSON.stringify({ user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
