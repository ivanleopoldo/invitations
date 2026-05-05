import { useEffect, useState } from "react";
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
import { useParams } from "react-router";
import { db } from "@/lib/db";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Loading from "@/components/Loading";

export default function RSVP() {
  const navigate = useNavigate();
  const [numGoing, setNumGoing] = useState<number>(0);
  const [error, setError] = useState<null | string>(null);
  const params = useParams();

  const { data, isLoading } = db.useQuery({
    invited: {
      $: {
        where: {
          id: params.inviteid,
        },
      },
    },
  });

  useEffect(() => {
    const invitedData = data?.invited as Array<{
      id: string;
      max_num_of_attendees: number;
      name: string;
      num_of_attendees?: number;
      prefix: string;
      role: string;
    }>;
    if (
      invitedData?.[0]?.num_of_attendees !== null &&
      invitedData?.[0]?.num_of_attendees !== undefined
    ) {
      setNumGoing(invitedData[0].num_of_attendees);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  const userData = (
    data?.invited as Array<{
      id: string;
      max_num_of_attendees: number;
      name: string;
      num_of_attendees?: number;
      prefix: string;
      role: string;
    }>
  )[0];

  const onConfirm = () => {
    if (userData.max_num_of_attendees < numGoing) {
      setError(`Can't go more than ${userData.max_num_of_attendees}`);
      return;
    }

    if (!params.inviteid) return;

    if (numGoing < 0) {
      setError("Can't be a negative number");
      return;
    }
    db.transact(
      db.tx.invited[params.inviteid].update({ num_of_attendees: numGoing }),
    )
      .catch((err) => {
        toast.error(err);
      })
      .then(() => {
        toast.success("Successful");
        setError("");
        if (numGoing === 0) {
          navigate("/itsokay");
        } else {
          navigate("/congrats");
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full h-svh">
      <div className="flex flex-col justify-center">
        <p className="font-handwritten font-black text-4xl">Hello,</p>
        <p className="ml-12 font-handwritten text-3xl md:text-4xl">
          {userData.prefix} {userData.name}
        </p>
        <p className="text-xl text-center">
          We have reserved{" "}
          <span className="bg-primary px-2 py-1 font-light">
            {userData.max_num_of_attendees} seats
          </span>{" "}
          for you.
        </p>
      </div>
      <FieldSet className="w-3/4 md:w-1/4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="number">How many are going?</FieldLabel>
            <Input
              className={"border-primary border-2"}
              id="number"
              type="number"
              value={numGoing}
              onChange={(e) => {
                setNumGoing(eval(e.currentTarget.value));
              }}
              min={0}
              max={userData.max_num_of_attendees}
            />
            {error && <FieldError>{error}</FieldError>}
          </Field>
        </FieldGroup>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => onConfirm()} className="w-full">
            Confirm
          </Button>
        </motion.div>
      </FieldSet>
      <div className="px-8">
        <p className="text-foreground/50 text-center">
          You can revisit this website if you've changed your mind.
        </p>
      </div>
    </div>
  );
}
