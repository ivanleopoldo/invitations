import { useEffect, useState } from "react";
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
import { Users, LogOut, TrendingUp, Plus } from "lucide-react";
import { motion } from "motion/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminPanel() {
  const { signOut, isSignedIn } = useAuth();
  const { useQuery } = useDatabase();
  const { data, isLoading } = useQuery({ invited: {} });
  const navigate = useNavigate();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInvitation, setEditingInvitation] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    max_num_of_attendees: 0,
    role: "",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingInvitation, setDeletingInvitation] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInvitation, setNewInvitation] = useState({
    name: "",
    max_num_of_attendees: 0,
    role: "",
  });

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn]);

  useEffect(() => {
    const handleEditInvitation = (event: any) => {
      const invitation = event.detail;
      setEditingInvitation(invitation);
      setFormData({
        name: invitation.name,
        max_num_of_attendees: invitation.max_num_of_attendees,
        role: invitation.role,
      });
      setIsEditDialogOpen(true);
    };

    const handleDeleteInvitation = (event: any) => {
      const invitation = event.detail;
      setDeletingInvitation(invitation);
      setIsDeleteDialogOpen(true);
    };

    window.addEventListener("edit-invitation", handleEditInvitation);
    window.addEventListener("delete-invitation", handleDeleteInvitation);

    return () => {
      window.removeEventListener("edit-invitation", handleEditInvitation);
      window.removeEventListener("delete-invitation", handleDeleteInvitation);
    };
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewInvitationChange = (field: string, value: string | number) => {
    setNewInvitation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!editingInvitation) return;

    try {
      await db.transact(
        db.tx[editingInvitation.id].update({
          name: formData.name,
          max_num_of_attendees: formData.max_num_of_attendees,
          role: formData.role,
        }),
      );
      setIsEditDialogOpen(false);
      setEditingInvitation(null);
    } catch (error) {
      console.error("Failed to update invitation:", error);
    }
  };

  const handleDelete = async () => {
    if (!deletingInvitation) return;

    try {
      await db.transact(db.tx[deletingInvitation.id].delete());
      setIsDeleteDialogOpen(false);
      setDeletingInvitation(null);
    } catch (error) {
      console.error("Failed to delete invitation:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const newId = crypto.randomUUID();
      await db.transact(
        db.tx[newId].insert({
          name: newInvitation.name,
          max_num_of_attendees: newInvitation.max_num_of_attendees,
          role: newInvitation.role,
          num_of_attendees: null,
        }),
      );
      setIsAddDialogOpen(false);
      setNewInvitation({
        name: "",
        max_num_of_attendees: 0,
        role: "",
      });
    } catch (error) {
      console.error("Failed to add invitation:", error);
    }
  };

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
            <div className="flex gap-2">
              <ButtonAnimated>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Invitation
                </Button>
              </ButtonAnimated>
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
          <h2 className="mb-4 font-italiana font-semibold text-foreground text-xl">
            Invitation Details
          </h2>
          <DataTable columns={columns} data={data?.invited ?? []} />
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              Update the details for this invitation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div>
              <label className="font-medium text-foreground text-sm">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="font-medium text-foreground text-sm">
                Max Attendees
              </label>
              <Input
                type="number"
                value={formData.max_num_of_attendees}
                onChange={(e) =>
                  handleInputChange(
                    "max_num_of_attendees",
                    parseInt(e.target.value) || 0,
                  )
                }
                placeholder="Enter max attendees"
              />
            </div>
            <div>
              <label className="font-medium text-foreground text-sm">
                Role
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Guest</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the invitation for "
              {deletingInvitation?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Invitation Dialog */}
      <AlertDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new invitation for a guest.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div>
              <label className="font-medium text-foreground text-sm">
                Name
              </label>
              <Input
                value={newInvitation.name}
                onChange={(e) =>
                  handleNewInvitationChange("name", e.target.value)
                }
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="font-medium text-foreground text-sm">
                Max Attendees
              </label>
              <Input
                type="number"
                value={newInvitation.max_num_of_attendees}
                onChange={(e) =>
                  handleNewInvitationChange(
                    "max_num_of_attendees",
                    parseInt(e.target.value) || 0,
                  )
                }
                placeholder="Enter max attendees"
              />
            </div>
            <div>
              <label className="font-medium text-foreground text-sm">
                Role
              </label>
              <Select
                value={newInvitation.role}
                onValueChange={(value) =>
                  handleNewInvitationChange("role", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent defaultValue="guest" defaultChecked>
                  <SelectItem value="guest">Guest</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdd}>
              Add Invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
