import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const messages = await prisma.message.findMany({
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });

    res.status(200).json(messages);
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
