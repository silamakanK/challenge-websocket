import CustomLink from "../../app/components/CustomLink";
import { useEffect,useState } from "react";


export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      fetch('/api/messages')
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((err) => console.error('Error fetching messages:', err));
  }, []);


  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
            <CustomLink href={`/messages/${message.id}`}>
                <strong>{message.user?.name}: </strong>
            </CustomLink>
            <strong>{message.content}</strong> 
        </li>
      ))}
    </ul>
  );
}

// export async function getStaticProps() {
//   const messages = await prisma.message.findMany({
//     include: { user: {
//         select: { id: true, name: true } 
//     } },    
//   });

//   return {
//     props: { messages: serialize(messages) },
//   };
// }