import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-4 w-full h-svh">
      <div>
        <p className="font-major text-xl">We still do.</p>
        <div className="-rotate-12">
          <p className="font-cursive text-7xl">Hannah</p>
          <p className="ml-32 font-cursive text-7xl">& Leo</p>
        </div>
      </div>
      <p className="font-handwritten text-xl md:text-5xl">
        Have you received an invite?
      </p>
      <p className="font-italiana text-lg md:text-4xl">
        If so, please use the invite link sent by the hosts.
      </p>
      <Button>Login with Access Code</Button>
    </div>
  );
}
