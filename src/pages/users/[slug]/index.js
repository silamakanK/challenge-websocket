import { PrismaClient } from "@prisma/client";
import { serialize } from "../../../app/lib/serialize";
import "../../../app/globals.css";
import CustomLink from "../../../app/components/CustomLink";

const prisma = new PrismaClient();

export default function UserPage({ user }) {

  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full mx-auto mt-20">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nom {user.name}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Email {user.email}</p>
        <CustomLink class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href={`/users`}>Back to users</CustomLink>
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