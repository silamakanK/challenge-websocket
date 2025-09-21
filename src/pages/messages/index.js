import CustomLink from "../../app/components/CustomLink";
import { useEffect,useState } from "react";
import "../../app/globals.css";


export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      fetch('/api/messages')
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((err) => console.error('Error fetching messages:', err));
  }, []);


  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Content</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <tr key={message.id}>
            <td className="border px-4 py-2">
              <CustomLink href={`/messages/${message.id}`}>
                {message.user?.name}
              </CustomLink>
            </td>
            <td className="border px-4 py-2">
              {message.content}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}
