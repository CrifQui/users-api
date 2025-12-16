import "dotenv/config";

import { prisma } from "../src/config/prisma";

const roles = ["ADMIN", "USER", "GUEST"] as const;

async function main() {
  console.log("🌱 Starting seed...");
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  console.log("✅ Roles seeded successfully");

  const adminRole = await prisma.role.findUnique({
    where: { name: "ADMIN" },
  });

  if (adminRole) {
    await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        password: "123456",
        name: "Admin User",
        roleId: adminRole.id,
      },
    });
    console.log("✅ Admin user created");
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });