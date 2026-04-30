import React, { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/instantdb";

export default function AdminPanel() {
  const { signOut } = useAuth();
  const { data, isLoading } = db.useQuery({ invited: {} });

  const signOutAll = () => {
    db.auth.signOut().then(() => {
      signOut();
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      AdminPanel
      <div>
        <Button onClick={() => signOutAll()} variant="destructive">
          Sign Out
        </Button>
      </div>
    </div>
  );
}
