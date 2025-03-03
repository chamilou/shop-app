// import Database from "better-sqlite3";
// import bcrypt from "bcrypt";

// // Initialize the database (creates the file if it doesn't exist)
// const db = new Database("almond_site.db");

// // Create the "recipes" table if it doesn't exist
// db.exec(`
//     CREATE TABLE IF NOT EXISTS recipes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         description TEXT NOT NULL,
//         image_path TEXT NOT NULL,
//         price REAL NOT NULL
//     );
// `);

// db.exec(`
//   CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       role TEXT NOT NULL DEFAULT 'user' -- 'user' or 'admin'
//   );
// `);

// // Hash a password
// export async function hashPassword(password) {
//   const saltRounds = 10;
//   return bcrypt.hash(password, saltRounds);
// }

// // Compare a password with its hash
// export async function comparePassword(password, hash) {
//   return bcrypt.compare(password, hash);
// }

// // Find a user by email
// export function findUserByEmail(email) {
//   const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
//   return stmt.get(email);
// }

// // Find a user by ID
// export function findUserById(id) {
//   const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
//   return stmt.get(id);
// }

// // Update user role (for admin)
// export function updateUserRole(id, role) {
//   const stmt = db.prepare("UPDATE users SET role = ? WHERE id = ?");
//   return stmt.run(role, id);
// }

// export function getUsers() {
//   const stmt = db.prepare("SELECT * FROM users");
//   return stmt.all();
// }

// export function addUser(name, email, password, role = "user") {
//   const stmt = db.prepare(
//     "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
//   );
//   return stmt.run(name, email, password, role);
// }

// export function deleteUser(id) {
//   const stmt = db.prepare("DELETE FROM users WHERE id = ?");
//   return stmt.run(id);
// }

// // Fetch all recipes
// export function getRecipes() {
//   const stmt = db.prepare("SELECT * FROM recipes");
//   return stmt.all();
// }

// // Fetch a single recipe by ID
// export function getRecipeById(id) {
//   const stmt = db.prepare("SELECT * FROM recipes WHERE id = ?");
//   return stmt.get(id);
// }

// // Insert a new recipe/product (optional, for future use)
// export function addRecipe(name, description, image_path, price) {
//   const stmt = db.prepare(
//     "INSERT INTO recipes (name, description, image_path,price) VALUES (?, ?, ?,?)"
//   );
//   return stmt.run(name, description, image_path, price);
// }

// export function addProduct(name, description, image_path, price) {
//   const stmt = db.prepare(
//     "INSERT INTO recipes (name, description, image_path, price) VALUES (?, ?, ?, ?)"
//   );
//   return stmt.run(name, description, image_path, price);
// }

// // Insert sample data (run this only once)
// function insertSampleData() {
//   const recipes = [
//     {
//       name: "Almond Paste Cake",
//       description:
//         "A moist and flavorful cake made with almond paste, perfect for any occasion.",
//       image_path: "/media/almond-paste-cake.jpg",
//       price: 12.2,
//     },
//     {
//       name: "Almond Paste Cookies",
//       description:
//         "Soft and chewy cookies with a rich almond flavor, made using almond paste.",
//       image_path: "/media/almond-paste-cookies.jpg",
//       price: 15.3,
//     },
//     {
//       name: "Marzipan Creations",
//       description:
//         "Create beautiful marzipan shapes and decorations using almond paste.",
//       image_path: "/media/almond-paste-marzipan.jpg",
//       price: 14.4,
//     },
//   ];

//   const stmt = db.prepare(
//     "INSERT INTO recipes (name, description, image_path,price) VALUES (?, ?, ?,?)"
//   );
//   for (const recipe of recipes) {
//     stmt.run(recipe.name, recipe.description, recipe.image_path, recipe.price);
//   }
// }

// // Uncomment the following line to insert sample data (run only once)
// //insertSampleData();
import Database from "better-sqlite3";
import bcrypt from "bcrypt";

// Initialize the database (creates the file if it doesn't exist)
const db = new Database("almond_site.db");

// Create the "recipes" table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image_path TEXT NOT NULL,
        price REAL NOT NULL
    );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' -- 'user' or 'admin'
  );
`);

// Hash a password
export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Compare a password with its hash
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Find a user by email
export function findUserByEmail(email) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
}

// Find a user by ID
export function findUserById(id) {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id);
}

// Update user role (for admin)
export function updateUserRole(id, role) {
  const stmt = db.prepare("UPDATE users SET role = ? WHERE id = ?");
  return stmt.run(role, id);
}

export function getUsers() {
  const stmt = db.prepare("SELECT * FROM users");
  return stmt.all();
}

export function addUser(name, email, password, role = "user") {
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
  );
  return stmt.run(name, email, password, role);
}

export function deleteUser(id) {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  return stmt.run(id);
}

// Fetch all recipes (products)
export function getProducts() {
  const stmt = db.prepare("SELECT * FROM recipes");
  console.log("Fetched products:");
  return stmt.all();
}

// Fetch a single recipe by ID
export function getProductById(id) {
  const stmt = db.prepare("SELECT * FROM recipes WHERE id = ?");
  return stmt.get(id);
}

// Insert a new recipe/product
export function addProduct(name, description, image_path, price) {
  const stmt = db.prepare(
    "INSERT INTO recipes (name, description, image_path, price) VALUES (?, ?, ?, ?)"
  );
  return stmt.run(name, description, image_path, price);
}

// Update an existing product
export function updateProduct(id, { name, description, imageUrl, price }) {
  const stmt = db.prepare(`
    UPDATE recipes 
    SET name = ?, description = ?, image_path = ?, price = ?
    WHERE id = ?
  `);
  return stmt.run(name, description, imageUrl || null, price, id);
}

// Delete a product
export function deleteProduct(id) {
  const stmt = db.prepare("DELETE FROM recipes WHERE id = ?");
  return stmt.run(id);
}

// Insert sample data (run this only once)
function insertSampleData() {
  const recipes = [
    {
      name: "Almond Paste Cake",
      description:
        "A moist and flavorful cake made with almond paste, perfect for any occasion.",
      image_path: "/media/almond-paste-cake.jpg",
      price: 12.2,
    },
    {
      name: "Almond Paste Cookies",
      description:
        "Soft and chewy cookies with a rich almond flavor, made using almond paste.",
      image_path: "/media/almond-paste-cookies.jpg",
      price: 15.3,
    },
    {
      name: "Marzipan Creations",
      description:
        "Create beautiful marzipan shapes and decorations using almond paste.",
      image_path: "/media/almond-paste-marzipan.jpg",
      price: 14.4,
    },
  ];

  const stmt = db.prepare(
    "INSERT INTO recipes (name, description, image_path, price) VALUES (?, ?, ?, ?)"
  );
  for (const recipe of recipes) {
    stmt.run(recipe.name, recipe.description, recipe.image_path, recipe.price);
  }
}

// Uncomment the following line to insert sample data (run only once)
//insertSampleData();

export { getProducts, getRecipeById, updateProduct, deleteProduct };
