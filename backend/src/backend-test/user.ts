import { auth, db } from "@/lib/auth.js";

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: string,
  address: string,
  phone: string
) {
  // Create user with better-auth API (role will be set to default "customer")
  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      address,
      phone,
    },
  });

  // Update role if it's different from default
  if (role !== "customer") {
    const usersCollection = db.collection("user");
    await usersCollection.updateOne(
      { email },
      { $set: { role, updatedAt: new Date() } }
    );
  }

  console.log("User created:", email, "with role:", role);
}
