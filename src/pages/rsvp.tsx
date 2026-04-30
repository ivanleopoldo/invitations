import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

export default function RSVP() {
  const [max, setMax] = useState<number>(0);
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full h-svh">
      <div className="flex flex-col justify-center">
        <p className="font-handwritten font-black text-4xl">Hello,</p>
        <p className="ml-12 font-handwritten text-3xl md:text-4xl">
          Mrs. & Ms. Leopoldo
        </p>
        <p className="text-xl text-center">
          We have reserved {max} seats for you.
        </p>
      </div>
      <FieldSet className="w-3/4 md:w-1/4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="number">How many are going?</FieldLabel>
            <Input id="number" type="number" min={0} max={max} />
          </Field>
        </FieldGroup>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button className="w-full">Confirm</Button>
        </motion.button>
      </FieldSet>
      <div>
        <p className="text-muted-foreground">
          You can revisit this website if you've changed your mind.
        </p>
      </div>
    </div>
  );
}
