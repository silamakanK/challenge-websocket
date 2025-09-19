import Image from "next/image";
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <hr />
      <main className="flex flex-col items-center gap-8 m-8">
        <h1 className="text-4xl font-bold text-center">
          Challenge WebSocket avec Next.js et Prisma
        </h1>
        <p className="text-center max-w-xl">
          Bienvenue dans ce challenge où vous allez implémenter une application de chat en temps réel utilisant WebSocket, Next.js et Prisma. Vous devrez gérer l'authentification des utilisateurs, la persistance des messages et l'affichage dynamique des conversations.
        </p>
      </main>
    </>
  );
}
