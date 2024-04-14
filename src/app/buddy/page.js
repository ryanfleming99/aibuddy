"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { random } from "nanoid";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null); // New state to store errors
  const [speech, setSpeech] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const inputRef = useRef(null);

  /* useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(response);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [response]); */

  useEffect(() => {
    if (response) {
      const utterance = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(utterance);
    }
  }, [response]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

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

    recognition.onresult = function(event) {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript;
      setSpeech(command);
      handleSubmit(command);
      console.log(speech);
    };
    recognition.onspeechend = function() {
      recognition.stop();
    };
  };

  async function handleSubmit(command) {
    /* e.preventDefault(); */

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: command })
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
      /* if (response) {
        const utterance = new SpeechSynthesisUtterance(response);
        window.speechSynthesis.speak(utterance);
        handlePlay();
      } */
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
          onChange={e => setSpeech(e.target.value)}
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
      <button ref={inputRef} className="playButton" onClick={handlePlay}>
        {isPaused ? "Resume" : "Play"}
      </button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
      {error && <p className="text-red-500">Error: {error.message}</p>}{" "}
      {/* Display error message if error state is set */}
      {response && <p className="text-green-500">{response}</p>}
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
