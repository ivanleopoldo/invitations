import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "motion/react";
import { NavLink, useParams } from "react-router";

export default function InviteLink() {
  const params = useParams();
  const isMobile = useIsMobile();
  return (
    <div className="md:p-0 px-4 py-8">
      <div className="relative flex md:flex-row flex-col gap-8 w-full md:h-svh">
        {!isMobile && (
          <section className="relative flex md:flex-[1.5] h-[50vh] md:h-full">
            <img
              src={"/final.jpg"}
              className="w-full object-cover object-top"
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
        )}
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
            {isMobile && <img src={"/scribble.png"} />}
            <div className="">
              <p className="font-cursive text-5xl md:text-7xl">Leo & Hannah</p>
            </div>
            <div className="flex flex-col justify-center gap-4 px-2 font-light text-center">
              <div className="flex flex-col gap-5">
                <p className="md:text-2xl text-center">
                  Together with their children, invite you to join them for a
                  dinner and dancing on
                </p>
                <p className="font-major text-xl md:text-2xl">
                  Thursday, 11th of June 2026
                </p>
                <p className="text-xl">at six o'clock in the evening at</p>
              </div>
              <div className="flex flex-col gap-2 scale-60 md:scale-100">
                <a
                  href="https://maps.app.goo.gl/CuEfWZiC2ZwLL4K47"
                  className="self-center bg-accent px-4 py-2 rounded-full w-fit"
                >
                  <p className="text-secondary-foreground">
                    📍 The Glass Pavilion, Beverly View Events Pavilion
                  </p>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 text-normal md:text-xl text-center">
              <p>We kindly encourage you to come in your</p>
              <p className="bg-gray-200 px-2 py-1 font-light text-background">
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
