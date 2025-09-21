import React from 'react';
import { PrismaClient } from '@prisma/client';
import { serialize } from '../../app/lib/serialize';
import "../../app/globals.css";

const prisma = new PrismaClient();


export default function UsersPage({users}) {

  return (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2"> {user.name} </td>
                <td className="border px-4 py-2"> {user.email} </td>
              </tr>
            ))}
          </tbody>
        </table>

  )
}



export async function getStaticProps() {
  const users = await prisma.user.findMany();

  return {
    props: { users: serialize(users) },
  };
}