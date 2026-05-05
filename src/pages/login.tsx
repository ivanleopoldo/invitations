import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { db } from "@/lib/db";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (password === "") {
      return;
    }

    const { error } = await signIn.password({
      emailAddress: "ivanleopoldoc@gmail.com",
      password,
    });

    if (error) {
      if (error.errors.length > 0) {
        error.errors.map((val) => {
          toast.error(JSON.stringify(val));
        });
      }
      console.error(JSON.stringify(error, null, 2));
      toast.error("Error Logging In", { description: error.errors });
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: async ({ session, decorateUrl }) => {
          const idToken = await session.getToken();

          db.auth
            .signInWithIdToken({
              clientName: "clerk",
              idToken,
            })
            .then(() => {
              const url = decorateUrl("/admin");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                toast.success("Login Successful");
                navigate(url);
              }
            })
            .catch((err) => {
              alert(JSON.stringify(err));
            });
        },
      });
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/admin");
    }
  }, [isSignedIn]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full h-svh">
      <div>
        <p className="font-major text-xl">We still do.</p>
        <div className="-rotate-12">
          <p className="font-cursive text-7xl">Hannah</p>
          <p className="ml-32 font-cursive text-7xl">& Leo</p>
        </div>
      </div>
      <p className="font-handwritten text-4xl">Login</p>
      <FieldSet className="w-2/3 md:w-1/5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="passphrase">Passphrase</FieldLabel>
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              id="passphrase"
            />
          </Field>
          <Button onClick={() => handleSubmit()}>Login</Button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
