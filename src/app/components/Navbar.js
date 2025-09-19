import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-black">
          MyApp
        </Link>

        <ul className="flex space-x-6 font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-blue-500 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className="hover:text-blue-500 transition-colors"
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              href="/messages"
              className="hover:text-blue-500 transition-colors"
            >
              Bloc
            </Link>
          </li>
           <li>
            <Link
              href="/login"
              className="hover:text-blue-500 transition-colors"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
