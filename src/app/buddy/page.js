"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null); // New state to store errors
  const [speech, setSpeech] = useState("");

  const handleSpeechSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || webkitSpeechGrammarList;
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    const grammar = "#JSGF V1.0;";
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = function (event) {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript;
      setSpeech(command);
      console.log(speech);
    };
    recognition.onspeechend = function () {
      recognition.stop();
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
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
          value={speech}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Say something..."
          className="border text-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </form>
      <button
        onClick={handleSpeechSearch}
        className="m-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Voice search
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}{" "}
      {/* Display error message if error state is set */}
      {response && <p className="text-green-500">{response}</p>}
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
