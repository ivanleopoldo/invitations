import confetti from "canvas-confetti";

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
      <div className="max-w-full text-center">
        <p className="font-major text-xl md:text-2xl">We still do.</p>
        <div className="text-center">
          <p className="font-cursive text-5xl md:text-7xl">Leo & Hannah</p>
        </div>
      </div>
      <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
        See you there!
      </p>
      <div className="flex flex-col justify-center items-center gap-2 px-4">
        <p className="text-base sm:text-lg md:text-xl text-center">
          On Thursday 6PM, 11th of June
        </p>
        <a
          href="https://maps.app.goo.gl/CuEfWZiC2ZwLL4K47"
          className="self-center bg-secondary px-4 py-2 rounded-full w-fit text-secondary-foreground text-center scale-75 sm:scale-90 md:scale-100"
        >
          <p className="text-sm sm:text-base md:text-lg">
            📍 The Glass Pavilion, Beverly View Events Pavilion
          </p>
        </a>
      </div>
      <p className="px-4 font-major text-xs sm:text-sm md:text-base text-center">
        Revisit the website if you've changed your mind
      </p>
    </div>
  );
}
