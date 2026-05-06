export type Invited = {
  id: string;
  max_num_of_attendees: number;
  num_of_attendees: number | null;
  name: string;
  prefix: "Mr. & Mrs." | "Mr." | "Mrs." | "Ms.";
  role: "guest" | "family" | "host";
};
