// scripts/create-admin.js
import { MedusaApp } from "@medusajs/modules-sdk"
import { containerLoader } from "@medusajs/medusa"

const adminEmail = "anisul.islam@carbondyne.ltd"       // ← Customize
const adminPassword = "@nisul01711594659"  // ← Customize

async function main() {
  const container = await containerLoader({ directory: process.cwd() })
  const app = new MedusaApp({ container })
  const userModule = await app.getModule("user")

  try {
    const existingUser = await userModule.retrieveByEmail(adminEmail)
    console.log(`⚠️ Admin already exists: ${adminEmail}`)
  } catch {
    await userModule.create({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    })
    console.log(`✅ Admin user created: ${adminEmail}`)
  }

  process.exit()
}

main().catch((err) => {
  console.error("❌ Error:", err.message)
  process.exit(1)
})
