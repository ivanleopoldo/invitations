import { Button } from "../ui/button";
import { ButtonAnimated } from "../animated/button-animated";

export function Location() {
  return (
    <ButtonAnimated>
      <Button variant="secondary" className="self-center rounded-full w-fit">
        <a
          href="https://maps.app.goo.gl/CuEfWZiC2ZwLL4K47"
          className="self-center px-4 py-2 rounded-full w-fit"
        >
          <p className="text-secondary-foreground">
            📍 The Glass Pavilion, Beverly View Events Pavilion
          </p>
        </a>
      </Button>
    </ButtonAnimated>
  );
}
