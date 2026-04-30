import confetti from "canvas-confetti";
import React from "react";

export default function Congrats() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-12 h-svh">
      <div>
        <p className="font-major text-xl">We still do.</p>
        <div className="-rotate-12">
          <p className="font-cursive text-7xl">Hannah</p>
          <p className="ml-32 font-cursive text-7xl">& Leo</p>
        </div>
      </div>
      <p className="font-handwritten text-3xl md:text-6xl">See you there!</p>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl">On Thursday 3PM, 11th of June</p>
        <a
          href="#"
          className="self-center bg-accent px-4 py-2 rounded-full w-fit"
        >
          <p>📍 4th Street, Beverly Hills</p>
        </a>
      </div>
      <p className="font-major md:text-normal text-xs text-center text-wrap">
        Revisit the website if you've changed your mind
      </p>
    </div>
  );
}
