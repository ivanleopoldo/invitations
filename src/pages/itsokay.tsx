import React from "react";

export default function ItsOkay() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-12 h-svh">
      <div>
        <p className="font-major text-xl">We still do.</p>
        <div className="-rotate-12">
          <p className="font-cursive text-7xl">Hannah</p>
          <p className="ml-32 font-cursive text-7xl">& Leo</p>
        </div>
      </div>
      <p className="font-handwritten text-3xl md:text-6xl">It's Okay!!</p>
      <p className="text-xl">We'll see you next time!</p>
      <p className="font-major md:text-normal text-xs text-center text-wrap">
        Revisit the website if you've changed your mind
      </p>
    </div>
  );
}
