import { Spinner } from "./ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-svh">
      <Spinner />
    </div>
  );
}
