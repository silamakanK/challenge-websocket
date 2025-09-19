import bcrypt from 'bcryptjs';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userData = [
  {
    id: 1,
    name: "Alice",
    email: "alice@prisma.io",
    password: bcrypt.hashSync("hashed_password_123"),
    role: "client",
    created_at: new Date("2025-09-17T10:00:00Z")
  },
  {
    id: 2,
    name: "John",
    email: "john@prisma.io",
    password: bcrypt.hashSync("hashed_password_123"),
    role: "admin",
    created_at: new Date("2025-09-17T10:00:00Z")
  },
  {
    id: 3,
    name: "Jane",
    email: "jane@prisma.io",
    password: bcrypt.hashSync("hashed_password_123"),
    role: "client",
    created_at: new Date("2025-09-17T10:00:00Z")
  }
];

const messageData = [
  {
    id: 1,
    content: "Hello, world!",
    userId: 1,
    created_at: new Date("2025-09-17T10:00:00Z")
  },
  {
    id: 2,
    content: "How are you?",
    userId: 2,
    created_at: new Date("2025-09-17T10:05:00Z")
  },
  {
    id: 3,
    content: "Goodbye!",
    userId: 3,
    created_at: new Date("2025-09-17T10:10:00Z")
  }
];

async function main() {
  console.log('Start seeding ...');

  await prisma.user.createMany({ data: userData });
  await prisma.message.createMany({ data: messageData });

  console.log('Seeding finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
