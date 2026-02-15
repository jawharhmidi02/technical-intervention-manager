"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Technician } from "../../types/intervention.types";
import { createIntervention } from "../api/intervention.api";
import { Intervention } from "../../types/intervention.types";

type Props = {
  technicians: Technician[];
  onCreated: (intervention: Intervention) => void;
};

export function CreateInterventionForm({ technicians, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !technicianId) return;
    setLoading(true);
    const intervention = await createIntervention({
      title,
      description,
      assignedToId: technicianId,
    });
    onCreated(intervention);
    setTitle("");
    setDescription("");
    setTechnicianId("");
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Intervention</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            value={technicianId}
            onChange={(e) => setTechnicianId(e.target.value)}
          >
            <option value="">Select technician</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Intervention"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
