import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/robot.webp")' }}
    >
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center bg-gradient-to-r from-purple-500 to-blue-500">
        <div>
          <h1 className="text-white text-2xl font-bold">AI Buddy</h1>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/features" legacyBehavior>
              <a className="text-white hover:text-gray-200">Features</a>
            </Link>
          </li>
          <li>
            <Link href="/pricing" legacyBehavior>
              <a className="text-white hover:text-gray-200">Pricing</a>
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              <a className="text-white hover:text-gray-200">About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact" legacyBehavior>
              <a className="text-white hover:text-gray-200">Contact</a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to AI Buddy!</h1>
        <p className="text-lg mb-10">
          Your smart companion for insightful conversations.
        </p>
        <Link href="/buddy" legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
            Start Chatting
          </a>
        </Link>
      </div>
    </div>
  );
}
