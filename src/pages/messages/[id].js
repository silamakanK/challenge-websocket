// import { PrismaClient } from '@prisma/client';
// import { serialize } from '../../../lib/serialize';
// import CustomLink from '../../../components/CustomLink';

// const prisma = new PrismaClient();

// export default function MessagesPage({ message }) {
//   return (
//     <>
//         <h1>Message Detail de <strong>{message.user.name} :</strong> </h1>
//         <p> {message.content } </p>
//         <p> Sent at: {message.created_at} </p>
//         <CustomLink href={`/messages`}>Back to messages</CustomLink>
//     </>
//   );
// }

// export async function getStaticPaths() {
//     const messages = serialize(await prisma.message.findMany({
//         include: { user: {
//             select: { id: true, name: true } 
//         } },    
//       }));

//     const paths = messages.map((message) => ({
//         params: { id: message.id.toString() },
//       }));

//     return {
//         paths,
//         fallback: false,
//       };
// }

// export async function getStaticProps({ params }) {
//     const messageId = parseInt(params.id, 10);
//     const message = await prisma.message.findUnique({
//         where: { id: messageId },
//         include: { user: {
//             select: { id: true, name: true } 
//         } },    
//       });

//     return {
//         props: { message: serialize(message) },
//       };
// }




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
    <>
      <h1>
        Message Détail de <strong>{message.user.name} :</strong>
      </h1>
      <p>{message.content}</p>
      <p>Sent at: {new Date(message.created_at).toLocaleString()}</p>
      <CustomLink href={`/messages`}>Back to messages</CustomLink>
    </>
  );
}
