import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table";
import { columns } from "@/components/table/columns";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import Loading from "@/components/Loading";

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
    return <Loading />;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div className="flex md:flex-row flex-col justify-center gap-6 p-2 md:p-18">
      <div className="flex flex-col items-center gap-6">
        <Card className="w-full md:w-fit">
          <CardContent className="flex flex-col justify-center items-center">
            <h1 className="flex flex-col font-italiana font-bold text-2xl">
              Headcount
            </h1>
            <p className="font-italiana text-6xl">
              {data?.invited?.reduce((total, current) => {
                //@ts-expect-error
                return total + (current?.num_of_attendees ?? 0);
              }, 0) ?? 0}
            </p>
          </CardContent>
        </Card>
        <Button className="w-full md:w-fit" onClick={() => signOutAll()}>
          Sign Out
        </Button>
      </div>
      <div className="w-full">
        {/* @ts-expect-error */}
        <DataTable columns={columns} data={data.invited} />
      </div>
    </div>
  );
}
