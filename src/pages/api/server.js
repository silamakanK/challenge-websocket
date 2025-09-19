const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const prisma = new PrismaClient();

io.on("connection", async (socket) => {
  console.log("Nouvelle connexion :", socket.id);

  const allAnswers = await prisma.answer.findMany({
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  socket.emit("all_answers", allAnswers.map(a => ({
    user: a.user.name,
    answer: a.content
  })));

  socket.on("send_answer", async ({ user, answer }) => {
    let dbUser = await prisma.user.findUnique({ where: { name: user } });
    if (!dbUser) {
      dbUser = await prisma.user.create({ data: { name: user } });
    }

    const dbAnswer = await prisma.answer.create({
      data: { content: answer, userId: dbUser.id }
    });

    const score = await prisma.answer.count({
      where: { userId: dbUser.id, content: "42" }
    });

    // Diffuser à tous
    io.emit("new_answer", { user: dbUser.name, answer: dbAnswer.content, score });
  });
});

server.listen(3030, () => {
  console.log("Serveur WebSocket lancé sur le port 3000");
});
