import { Names } from "@/components/general/names";

export default function ItsOkay() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-4 md:p-12 h-svh">
      <Names />
      <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
        It's Okay!!
      </p>
      <p className="text-base sm:text-lg md:text-xl text-center">
        We'll see you next time!
      </p>
      <p className="px-4 font-major text-xs sm:text-sm md:text-base text-center">
        Revisit the website if you've changed your mind
      </p>
    </div>
  );
}
