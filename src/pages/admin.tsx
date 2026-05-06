import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table";
import { columns, type Invited } from "@/components/table/columns";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import Loading from "@/components/general/loading";
import { ButtonAnimated } from "@/components/animated/button-animated";

export default function AdminPanel() {
  const { signOut, isSignedIn } = useAuth();
  const { data, isLoading } = db.useQuery({ invited: {} }) as {
    data?: { invited: Invited[] } | null;
    isLoading: boolean;
  };
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
                return total + (current?.num_of_attendees ?? 0);
              }, 0) ?? 0}
            </p>
          </CardContent>
        </Card>
        <ButtonAnimated>
          <Button className="w-full md:w-fit" onClick={() => signOutAll()}>
            Sign Out
          </Button>
        </ButtonAnimated>
      </div>
      <div className="w-full">
        <DataTable columns={columns} data={data?.invited ?? []} />
      </div>
    </div>
  );
}
