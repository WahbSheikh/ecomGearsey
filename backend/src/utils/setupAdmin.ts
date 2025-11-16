import { db } from "@/lib/auth.js";
import bcrypt from "bcrypt";

export async function setupDefaultAdmin() {
  try {
    const usersCollection = db.collection("user");
    const accountsCollection = db.collection("account");
    
    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ 
      email: "admin@admin.com"
    });
    
    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      
      // Check if account exists
      const existingAccount = await accountsCollection.findOne({ 
        userId: existingAdmin.id,
        providerId: "credential"
      });
      
      if (existingAccount) {
        // Test password
        const passwordMatch = await bcrypt.compare("admin582005", existingAccount.password);
        
        if (!passwordMatch) {
          console.log("⚠️ Admin password incorrect. Fixing...");
          const newHash = await bcrypt.hash("admin582005", 10);
          await accountsCollection.updateOne(
            { id: existingAccount.id },
            { $set: { password: newHash, updatedAt: new Date() } }
          );
          console.log("✅ Admin password fixed!");
        }
      } else {
        // Account missing, create it
        console.log("⚠️ Admin account missing. Creating...");
        const hashedPassword = await bcrypt.hash("admin582005", 10);
        await accountsCollection.insertOne({
          id: crypto.randomUUID(),
          userId: existingAdmin.id,
          accountId: "admin@admin.com",
          providerId: "credential",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log("✅ Admin account created!");
      }
      
      // Ensure role is admin
      if (existingAdmin.role !== "admin") {
        await usersCollection.updateOne(
          { id: existingAdmin.id },
          { $set: { role: "admin", updatedAt: new Date() } }
        );
        console.log("✅ Admin role set!");
      }
      
      return;
    }
    
    console.log("🔧 Creating default admin user...");
    
    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash("admin582005", 10);
    const now = new Date();
    
    // Create user
    await usersCollection.insertOne({
      id: userId,
      name: "Abdul Wahab Shahid",
      email: "admin@admin.com",
      emailVerified: true,
      image: null,
      phone: "+92 3349299949",
      address: "Default Address",
      role: "admin",
      rating: 0,
      total_reviews: 0,
      createdAt: now,
      updatedAt: now,
    });
    
    // Create account
    await accountsCollection.insertOne({
      id: crypto.randomUUID(),
      userId: userId,
      accountId: "admin@admin.com",
      providerId: "credential",
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });
    
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ ADMIN CREATED");
    console.log("📧 Email: admin@admin.com");
    console.log("🔑 Password: admin582005");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    
  } catch (error) {
    console.error("❌ Error setting up admin:", error);
  }
}