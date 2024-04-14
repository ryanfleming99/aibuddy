"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null); // New state to store errors

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
      setError(null); // Reset error state if request succeeds
    } catch (error) {
      console.error("Failed to fetch the chat response:", error);
      setError(error); // Set error state to be displayed in UI
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Say something..."
          className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error.message}</p>}{" "}
      {/* Display error message if error state is set */}
      {response && <p className="text-green-500">{response}</p>}
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
