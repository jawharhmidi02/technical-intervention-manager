"use client";

import { useEffect, useState } from "react";
import { Technician, Intervention } from "../../types/intervention.types";
import { getTechnicians, getInterventions } from "../api/intervention.api";
import { CreateInterventionForm, InterventionList } from "../components";

export function AdminDashboardView() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);

  useEffect(() => {
    getTechnicians().then(setTechnicians);
    getInterventions().then(setInterventions);
  }, []);

  const handleCreated = (intervention: Intervention) => {
    setInterventions((prev) => [intervention, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <CreateInterventionForm
          technicians={technicians}
          onCreated={handleCreated}
        />
        <InterventionList interventions={interventions} />
      </div>
    </div>
  );
}
