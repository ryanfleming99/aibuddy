"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const character = document.getElementById("character");
    const handleHover = () => {
      if (character) {
        character.classList.add("animate-fly-away");
      }
    };
    if (character) {
      character.addEventListener("mouseenter", handleHover);
      return () => {
        character.removeEventListener("mouseenter", handleHover);
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <img
        src="/images/ball.png"
        alt="Floating Character"
        id="character"
        className="absolute animate-float animate-spin"
        style={{ width: "200px", zIndex: "1" }}
      />
      <div className="w-1/2 h-1/2 bg-white opacity-75"></div>
    </div>
  );
}
