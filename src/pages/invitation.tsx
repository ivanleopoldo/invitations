import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/instantdb";
import { motion } from "motion/react";
import { useState } from "react";

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
                26
              </p>
            </div>
          </div>
        </div>
        <motion.div className="flex flex-col md:flex-1 justify-center items-center gap-8 md:p-18 md:h-svh">
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
          <div className="flex flex-col justify-center gap-2 font-light text-center">
            <p className="font-italiana md:text-2xl text-center">
              Invite you to join them and their children as they renew their
              vows
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-light">
                ON THURSDAY, THREE O'CLOCK IN THE AFTERNOON
              </p>
              <button className="self-center bg-accent px-4 py-2 rounded-full w-fit">
                <p>📍 Archbishop's Palace</p>
              </button>
              <p>Dinner, singing and dancing will follow at</p>
              <button className="self-center bg-accent px-4 py-2 rounded-full w-fit">
                <p>📍 4th Street, Beverly Hills</p>
              </button>
            </div>
          </div>
          <p className="justify-end">
            We kindly encourage you to come in your{" "}
            <span className="font-extrabold limelight">
              Midnight Blue Formal
            </span>
            Attire.
          </p>
          <div className="bg-secondary p-4 rounded-full text-center scale-75">
            <p className="font-light text-sm">SCROLL</p>
            <p>↓</p>
          </div>
        </motion.div>
      </div>
      <Separator />
      <div className="md:h-svh">hello</div>
    </div>
  );
}
