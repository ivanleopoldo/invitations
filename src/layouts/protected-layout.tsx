import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@clerk/react";
import { db } from "@/lib/db";

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { isLoading, user } = db.useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && isLoaded && !isLoading && user) {
      navigate("/login");
    }
  }, [isSignedIn, isLoaded, isLoading, user]);

  if (isLoaded && !isLoading) {
    return <Outlet />;
  }
}
