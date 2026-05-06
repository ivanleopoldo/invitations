import { cn } from "@/lib/utils";

export function Names({
  className,
  showWeStillDo = true,
}: {
  className?: string;
  showWeStillDo?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4 max-w-full", className)}>
      {showWeStillDo && (
        <p className="font-major text-xl md:text-2xl">We still do.</p>
      )}
      <p className="font-cursive text-5xl md:text-7xl">Leo & Hannah</p>
    </div>
  );
}
