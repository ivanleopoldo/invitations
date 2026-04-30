import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { motion } from "motion/react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

export default function InviteLink() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <div className="relative flex md:flex-row flex-col w-full md:h-svh">
        <section className="relative flex md:flex-[1.5] h-[50vh] md:h-full">
          <img
            src={"../../public/final.jpg"}
            className="invert-20 sepia-50 w-full object-cover object-top"
          />
          <div className="bottom-0 absolute">
            <div className="relative flex flex-row md:flex-col">
              <p className="font-major font-bold text-secondary md:text-[12rem]/60 text-7xl/35 motion-preset-slide-up">
                06
              </p>
              <p className="font-major font-bold text-secondary md:text-[12rem]/15 text-7xl/35 motion-delay-300 motion-preset-slide-up">
                11
              </p>
              <p className="font-major font-bold text-secondary md:text-[12rem]/60 text-7xl/35 motion-delay-600 motion-preset-slide-up-sm">
                26
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-1 justify-center items-center gap-8 md:p-18 md:h-full min-h-[50vh]">
          <div className="flex flex-col justify-center items-center gap-8">
            <div>
              <p className="font-major md:text-xl text-center">
                In honor of celebrating{" "}
                <span className="bg-primary px-2 py-1 font-bold text-white">
                  25 years
                </span>{" "}
                of their marriage
              </p>
            </div>
            <div className="-rotate-12">
              <p className="font-cursive text-7xl">Hannah</p>
              <p className="ml-32 font-cursive text-7xl">& Leo</p>
            </div>
            <div className="flex flex-col justify-center gap-8 font-light text-center">
              <div className="flex flex-col gap-5">
                <p className="md:text-2xl text-center">
                  Invite you to join them and their children as they
                </p>
                <p className="font-handwritten text-4xl">renew their vows</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl">On Thursday 3PM, 11th of June</p>
                <a
                  href="#"
                  className="self-center bg-accent px-4 py-2 rounded-full w-fit"
                >
                  <p>📍 4th Street, Beverly Hills</p>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 text-xl">
              <p>We kindly encourage you to come in your</p>
              <p className="bg-blue-900 px-2 py-1 font-light text-white">
                Formal Midnight Blue Attire.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink to={`/rsvp/${params.inviteid}`}>
                <Button className="rounded-none scale-120" size={"lg"}>
                  <p>Click Here for RSVP</p>
                </Button>
              </NavLink>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
