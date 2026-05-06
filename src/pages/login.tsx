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
import { Loader2 } from "lucide-react";
import { ButtonAnimated } from "@/components/animated/button-animated";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!password.trim()) {
      setError("Please enter your passphrase");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn.password({
        emailAddress: "ivanleopoldoc@gmail.com",
        password,
      });

      if (result.error) {
        const errorMessage = result.error.message || "Login failed";
        setError(errorMessage);
        toast.error("Login Failed", { description: errorMessage });
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: async ({ session, decorateUrl }) => {
            try {
              const idToken = await session.getToken();

              if (!idToken) {
                setError("Failed to get authentication token");
                return;
              }

              await db.auth.signInWithIdToken({
                clientName: "clerk",
                idToken,
              });

              const url = decorateUrl("/admin");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                toast.success("Login Successful");
                navigate(url);
              }
            } catch (dbError) {
              const errorMessage =
                dbError instanceof Error
                  ? dbError.message
                  : "Database authentication failed";
              setError(errorMessage);
              toast.error("Authentication Error", {
                description: errorMessage,
              });
            }
          },
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Login Error", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/admin");
    }
  }, [isSignedIn, navigate]);

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
              className="placeholder:text-white/50"
              type="password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              id="passphrase"
              placeholder="Enter your passphrase"
              disabled={isLoading}
              aria-invalid={!!error}
            />
            {error && (
              <p className="mt-1 text-destructive text-sm" role="alert">
                {error}
              </p>
            )}
          </Field>
          <ButtonAnimated>
            <Button
              onClick={() => handleSubmit()}
              disabled={isLoading || !password.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </ButtonAnimated>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
