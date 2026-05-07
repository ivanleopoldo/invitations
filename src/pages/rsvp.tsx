import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Loading from "@/components/general/loading";
import { ButtonAnimated } from "@/components/animated/button-animated";
import { useDatabase } from "@/hooks/use-database";
import { db } from "@/lib/db";
import { Footer } from "@/components/general/footer";

export default function RSVP() {
  const navigate = useNavigate();
  const [numGoing, setNumGoing] = useState<number>(0);
  const [error, setError] = useState<null | string>(null);
  const { useQuery, useMutation } = useDatabase();
  const params = useParams();

  const { data, isLoading } = useQuery({
    invited: {
      $: {
        where: {
          id: params.inviteid,
        },
      },
    },
  });

  useEffect(() => {
    const invitedData = data?.invited?.[0];
    if (
      invitedData?.num_of_attendees !== null &&
      invitedData?.num_of_attendees !== undefined
    ) {
      setNumGoing(invitedData.num_of_attendees);
    }
  }, [data]);

  if (isLoading || !data?.invited) {
    return <Loading />;
  }

  const userData = data.invited[0];

  const onConfirm = () => {
    if (!params.inviteid) return;

    if (userData.max_num_of_attendees < numGoing) {
      setError(`Can't go more than ${userData.max_num_of_attendees} seats`);
      return;
    }

    if (numGoing < 0) {
      setError("Can't be a negative number");
      return;
    }

    if (isNaN(numGoing)) {
      setError("Please enter a valid number");
      return;
    }

    useMutation(
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start text-center">
          <p className="font-italiana font-black text-2xl md:text-4xl">
            Hello,
          </p>
          <p className="self-center font-italiana text-5xl md:text-6xl">
            {userData.prefix} {userData.name}
          </p>
        </div>
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
            <FieldLabel htmlFor="number">How many of you are going?</FieldLabel>
            <Input
              id="number"
              type="number"
              value={numGoing}
              onChange={(e) => {
                setNumGoing(parseInt(e.currentTarget.value));
              }}
              min={0}
              max={userData.max_num_of_attendees}
            />
            {error && (
              <FieldError className="bg-destructive px-2 py-1 text-foreground">
                {error}
              </FieldError>
            )}
          </Field>
        </FieldGroup>
        <ButtonAnimated>
          <Button onClick={() => onConfirm()} className="w-full">
            Confirm
          </Button>
        </ButtonAnimated>
      </FieldSet>
      <Footer />
    </div>
  );
}
