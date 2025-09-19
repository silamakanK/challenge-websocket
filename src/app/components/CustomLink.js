import Link from 'next/link';

export default function CustomLink({ href, children }) {
  return (
    <Link href={href} className="hover:text-blue-500 transition-colors">
      {children}
    </Link>
  );
}   