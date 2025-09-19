import { PrismaClient } from "@prisma/client";
import { serialize } from "../../../app/lib/serialize";

const prisma = new PrismaClient();

export default function UserPage({ user }) {

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const users = serialize(await prisma.user.findMany());

  const paths = users.map((user) => ({
    params: { slug: user.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const userId = parseInt(params.slug, 10);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return {
    props: { user: serialize(user) },
  };
}