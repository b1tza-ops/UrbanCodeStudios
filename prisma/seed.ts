import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@urbancodestudios.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";

  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hash },
    create: {
      name: "Admin",
      email,
      passwordHash: hash,
      role: "ADMIN",
    },
  });

  console.log(`Admin user ready: ${user.email} (${user.id})`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
