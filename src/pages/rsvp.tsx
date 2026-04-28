import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RSVP() {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      attendance,
    };

    console.log("RSVP Submitted:", payload);

    // TODO: send to Supabase
  };

  return (
    <div className="flex justify-center items-center bg-neutral-50 px-4 py-10 w-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white shadow-lg p-8 rounded-3xl w-full max-w-md"
      >
        <div className="text-center">
          <h2 className="font-handwritten font-semibold text-2xl">RSVP</h2>
          <p className="mt-1 text-neutral-500 text-sm">
            Please let us know if you can attend
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Family Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-sm">Will you attend?</label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAttendance("yes")}
              className={`flex-1 py-3 rounded-xl border ${
                attendance === "yes" ? "bg-black text-white" : "bg-white"
              }`}
            >
              Accept
            </button>

            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={`flex-1 py-3 rounded-xl border ${
                attendance === "no" ? "bg-black text-white" : "bg-white"
              }`}
            >
              Decline
            </button>
          </div>
        </div>

        {attendance === "yes" && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Number of Guests</label>
            <input
              type="number"
              min={1}
              value={form.guests}
              onChange={(e) =>
                setForm({
                  ...form,
                  guests: Number(e.target.value),
                })
              }
              className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Message (optional)</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black/20"
            rows={3}
            placeholder="Leave a message..."
          />
        </div>

        <Button
          type="submit"
          className="py-5 rounded-2xl w-full text-base"
          disabled={!attendance || !form.name}
        >
          Proceed
        </Button>
      </form>
    </div>
  );
}
