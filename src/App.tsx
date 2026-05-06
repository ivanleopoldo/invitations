import { Button } from "./components/ui/button";
import { useNavigate } from "react-router";
import { Names } from "./components/general/names";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-4 px-4 w-full h-svh">
      <Names />
      <p className="font-italiana text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
        Have you received an invite?
      </p>
      <p className="font-italiana text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center">
        If so, please use the invite link sent by the hosts.
      </p>
      <Button onClick={() => navigate("/login")}>Login with Access Code</Button>
    </div>
  );
}
