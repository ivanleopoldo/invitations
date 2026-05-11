import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { NavLink, useParams } from "react-router";
import { Names } from "@/components/general/names";
import { Location } from "@/components/general/location";
import { ButtonAnimated } from "@/components/animated/button-animated";
import { Mars, Venus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function InviteLink() {
  const params = useParams();
  const isMobile = useIsMobile();
  return (
    <div className="relative flex md:flex-row flex-col gap-8 w-full md:h-svh scale-90 md:scale-100">
      {!isMobile && (
        <section className="relative flex md:flex-[1.5] h-[50vh] md:h-full">
          <img src={"/final.jpg"} className="w-full object-cover object-top" />
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
      <section className="flex flex-col md:flex-1 justify-center items-center gap-8 p-4 md:p-18 md:h-full min-h-[50vh]">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="px-8 md:px-0">
            <p className="font-major md:text-xl text-center">
              In honor of celebrating{" "}
            </p>
            <p className="font-major md:text-xl text-center">
              <span className="bg-primary px-2 py-1 font-bold text-white text-2xl">
                25 years
              </span>{" "}
            </p>
            <p className="font-major md:text-xl text-center">
              of their marriage
            </p>
          </div>
          {isMobile && <img src={"/scribble.png"} />}
          <Names showWeStillDo={false} />
          <div className="flex flex-col justify-center gap-4 px-6 font-light text-center">
            <div className="flex flex-col gap-5 px-8 md:px-0">
              <p className="md:text-2xl text-center">
                Together with their children, invite you to join them for a
                dinner and dancing on
              </p>
              <p className="font-major text-xl md:text-2xl">
                Thursday, 11th of June 2026
              </p>
              <p className="text-xl">six o'clock in the evening at</p>
            </div>
            <Location />
          </div>
          <Separator className="bg-foreground/20 mx-8 px-8" />
          <div className="flex flex-col justify-center items-center gap-2 px-8">
            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <p className="font-major text-2xl md:text-3xl text-start">
                Attire
              </p>
              <p className="bg-gray-200 px-2 py-1 font-bold text-background">
                Midnight Blue Color
              </p>
            </div>
            <div className="gap-4 grid grid-cols-2 text-normal md:text-xl text-center">
              <div className="flex flex-col items-center gap-4">
                <Venus className="bg-primary mb-1 p-2 w-10 h-10" />
                <span>
                  Knee-length dresses, mid-length dresses (formal), Jumpsuits,
                  Blouse, Slacks
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Mars className="bg-white mb-1 p-2 w-10 h-10 text-primary" />
                <span>Long sleeves polo with tie</span>
              </div>
            </div>
          </div>
          <Separator className="bg-foreground/20 mx-8 px-8" />
          <ButtonAnimated>
            <NavLink to={`/rsvp/${params.inviteid}`}>
              <Button className="rounded-none" size={"lg"}>
                <p>Click Here for RSVP</p>
              </Button>
            </NavLink>
          </ButtonAnimated>
        </div>
      </section>
    </div>
  );
}
