import React, { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table";
import { columns } from "@/components/table/columns";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function AdminPanel() {
  const { signOut, isSignedIn } = useAuth();
  const { data, isLoading } = db.useQuery({ invited: {} });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn]);

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
    <div className="flex flex-row gap-6 p-18">
      <div className="flex flex-col items-center gap-6">
        <Card className="w-fit">
          <CardContent className="flex flex-col justify-center items-center">
            <h1 className="flex flex-col font-italiana font-bold text-2xl">
              Headcount
            </h1>
            <p className="font-italiana text-6xl">
              {data?.invited?.reduce((total, current) => {
                return total + (current?.num_of_attendees ?? 0);
              }, 0) ?? 0}
            </p>
          </CardContent>
        </Card>
        <Button onClick={() => signOutAll()} variant="destructive">
          Sign Out
        </Button>
      </div>
      <div className="">
        <DataTable columns={columns} data={data.invited} />
      </div>
    </div>
  );
}
