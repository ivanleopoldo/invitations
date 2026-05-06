import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DataTable } from "@/components/table";
import { columns } from "@/components/table/columns";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import Loading from "@/components/general/loading";
import { ButtonAnimated } from "@/components/animated/button-animated";
import { useDatabase } from "@/hooks/use-database";
import { Users, LogOut, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function AdminPanel() {
  const { signOut, isSignedIn } = useAuth();
  const { useQuery } = useDatabase();
  const { data, isLoading } = useQuery({ invited: {} });
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

  const totalAttendees =
    data?.invited?.reduce((total, current) => {
      return total + (current?.num_of_attendees ?? 0);
    }, 0) ?? 0;

  const totalInvitations = data?.invited?.length ?? 0;

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
            <div>
              <h1 className="mb-2 font-italiana font-bold text-foreground text-3xl md:text-4xl">
                Admin Dashboard
              </h1>
              <p className="text-foreground">
                Manage your wedding invitations and track RSVPs
              </p>
            </div>
            <ButtonAnimated>
              <Button
                variant="outline"
                onClick={() => signOutAll()}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </ButtonAnimated>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
        >
          <Card className="bg-background/50 hover:shadow-lg backdrop-blur-sm border-border/50 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 font-medium text-foreground text-sm">
                    Total Headcount
                  </p>
                  <p className="font-italiana font-bold text-foreground text-3xl">
                    {totalAttendees}
                  </p>
                  <p className="mt-1 text-foreground text-xs">
                    Expected attendees
                  </p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 hover:shadow-lg backdrop-blur-sm border-border/50 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 font-medium text-foreground text-sm">
                    Total Invitations
                  </p>
                  <p className="font-italiana font-bold text-foreground text-3xl">
                    {totalInvitations}
                  </p>
                  <p className="mt-1 text-foreground text-xs">
                    Invitations sent
                  </p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 hover:shadow-lg backdrop-blur-sm border-border/50 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 font-medium text-foreground text-sm">
                    Response Rate
                  </p>
                  <p className="font-italiana font-bold text-foreground text-3xl">
                    {totalInvitations > 0
                      ? `${((totalAttendees / totalInvitations) * 100).toFixed(0)}%`
                      : "0%"}
                  </p>
                  <p className="mt-1 text-foreground text-xs">RSVP rate</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm p-0 border-border/50">
            <CardContent className="p-6">
              <h2 className="mb-4 font-italiana font-semibold text-foreground text-xl">
                Invitation Details
              </h2>
              <DataTable columns={columns} data={data?.invited ?? []} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
