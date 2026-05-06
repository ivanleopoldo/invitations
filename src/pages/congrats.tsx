import confetti from "canvas-confetti";
import { Names } from "@/components/general/names";
import { Location } from "@/components/general/location";
import { Footer } from "@/components/general/footer";

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
    <div className="flex flex-col justify-center items-center gap-8 p-4 md:p-12 h-svh">
      <Names />
      <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
        See you there!
      </p>
      <div className="flex flex-col justify-center items-center gap-2 px-4">
        <p className="text-base sm:text-lg md:text-xl text-center">
          On Thursday 6PM, 11th of June
        </p>
        <Location />
      </div>
      <Footer />
    </div>
  );
}
