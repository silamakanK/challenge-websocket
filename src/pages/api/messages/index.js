import { PrismaClient } from '@prisma/client';
// import { serialize } from '../../app/lib/serialize';

const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     const userId = parseInt(id, 10);
//     const messages = await prisma.message.findMany({
//       where: { userId },
//       include: { user: { select: { id: true, name: true } } },
//     });
//     res.status(200).json(serialize(messages));
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

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
