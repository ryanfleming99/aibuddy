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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full h-48 flex items-center justify-center">
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}{" "}
        {/* Display error message if error state is set */}
        <div className="w-full md:w-1/4 bg-transparent rounded-lg flex justify-center">
          {response && (
            <p className="text-white text-wrap break-normal">{response}</p>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mb-4 w-full md:w-auto m-10">
        <input
          type="text"
          value={speech}
          onChange={e => setSpeech(e.target.value)}
          placeholder="Say something..."
          className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 w-full md:w-auto"
        />
      </form>
      <button
        type="submit"
        className="w-1/4 m-3 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Send
      </button>
      <button
        onClick={handleSpeechSearch}
        className="w-1/4 m-3  text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Voice search
      </button>
      <div className="flex ">
        <button ref={inputRef} className="playButton mr-2" onClick={handlePlay}>
          {isPaused ? "Resume" : "Play"}
        </button>
        <button onClick={handlePause} className="mr-2">
          Pause
        </button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <Link href="/" className="text-blue-500 hover:underline mt-4">
        Back to Home
      </Link>
    </div>
  );
}
