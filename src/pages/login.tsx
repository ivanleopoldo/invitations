import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { db } from "@/lib/db";
import { Names } from "@/components/general/names";

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
      // @ts-expect-error
      if (error.errors.length > 0) {
        // @ts-expect-error
        error.errors.map((val) => {
          toast.error(JSON.stringify(val));
        });
      }
      console.error(JSON.stringify(error, null, 2));
      // @ts-expect-error
      toast.error("Error Logging In", { description: error.errors });
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: async ({ session, decorateUrl }) => {
          const idToken = await session.getToken();

          if (!idToken) return;

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
    <div className="flex flex-col justify-center items-center gap-12 w-full h-svh">
      <Names className="scale-75" />
      <FieldSet className="px-4 w-full max-w-xs">
        <FieldTitle>
          <p className="self-start font-italiana text-2xl md:text-4xl">Login</p>
        </FieldTitle>
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
