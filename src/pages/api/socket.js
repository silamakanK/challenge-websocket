import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: { bodyParser: false },
};

// ⚡ mettre async ici règle l'erreur
export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initialisation du serveur Socket.IO");

    const io = new Server(res.socket.server, {
      path: "/api/socketio",
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Nouvelle connexion:", socket.id);

      socket.on("send_message", async (msg) => {
        try {
          const saved = await prisma.message.create({
            data: {
              content: msg.content,
              userId: msg.userId,
            },
          });

          io.emit("receive_message", saved);
        } catch (err) {
          console.error("Erreur lors de l’enregistrement du message:", err);
        }
      });
    });
  }

  res.end();
}
