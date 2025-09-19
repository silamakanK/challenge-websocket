import { PrismaClient } from "@prisma/client";
import { serialize } from "../../../app/lib/serialize";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const message = await prisma.message.findUnique({
      where: { id: parseInt(id, 10) },
      include: { user: { select: { id: true, name: true } } },
    });


    if(!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  } 
} 