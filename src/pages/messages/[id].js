'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomLink from "../../app/components/CustomLink";

export default function MessageDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/messages/${id}`)
        .then((res) => res.json())
        .then((data) => setMessage(data));
    } 
  }, [id]);

  if (!message) return <p>Chargement...</p>;

  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full mx-auto mt-20">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Message Détail de {message.user.name} :</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{message.content}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Sent at: {new Date(message.created_at).toLocaleString()}</p>
        <CustomLink class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href={`/messages`}>Back to messages</CustomLink>
    </div>
  );
}
