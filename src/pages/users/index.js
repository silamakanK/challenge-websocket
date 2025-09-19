import React from 'react';
import { PrismaClient } from '@prisma/client';
import { serialize } from '../../app/lib/serialize';

const prisma = new PrismaClient();


export default function UsersPage({users}) {

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  )
}


export async function getStaticProps() {
  const users = await prisma.user.findMany();

  return {
    props: { users: serialize(users) },
  };
}