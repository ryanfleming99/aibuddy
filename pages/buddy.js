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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Say something..."
        />
        <button type="submit">Send</button>
      </form>
      {error && <p>Error: {error.message}</p>}{" "}
      {/* Display error message if error state is set */}
      {response && <p>{response}</p>}
      <Link href="/">Back to Home</Link>
    </div>
  );
}
