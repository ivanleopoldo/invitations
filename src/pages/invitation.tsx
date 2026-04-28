import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export default function InviteLink() {
  return (
    <div>
      <div className="relative flex md:flex-row flex-col w-full md:h-svh">
        <div className="relative flex md:flex-[1.5]">
          <img
            src={"together.jpg"}
            className="invert-20 sepia-50 w-full object-cover object-top"
          />
          <div className="bottom-0 absolute">
            <div className="relative flex flex-row md:flex-col">
              <p className="font-major font-bold text-background md:text-[12rem]/60 text-7xl/35 motion-preset-slide-up">
                06
              </p>
              <p className="font-major font-bold text-background md:text-[12rem]/15 text-7xl/35 motion-delay-300 motion-preset-slide-up">
                11
              </p>
              <p className="font-major font-bold text-background md:text-[12rem]/60 text-7xl/35 motion-delay-600 motion-preset-slide-up-sm">
                25
              </p>
            </div>
          </div>
        </div>
        <motion.div className="flex flex-col md:flex-1 items-center gap-8 md:p-12 md:h-svh">
          <div>
            <p className="font-major text-xl md:text-4xl text-center">
              In honor of celebrating 25 years of their marriage
            </p>
          </div>
          <div className="flex flex-row gap-8 mt-8 -rotate-12">
            <div>
              <p className="font-handwritten font-bold text-7xl">Hannah</p>
              <p className="ml-32 font-handwritten font-bold text-7xl">Leo</p>
            </div>
            <p className="mt-12 font-handwritten text-7xl">+</p>
          </div>
          <div></div>
        </motion.div>
      </div>
      <Separator />
      <div className="md:h-svh">hello</div>
    </div>
  );
}
