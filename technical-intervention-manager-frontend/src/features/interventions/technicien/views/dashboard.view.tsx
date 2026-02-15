"use client";

import { useEffect, useState } from "react";
import { Intervention } from "../../types/intervention.types";
import { getMyInterventions } from "../api/intervention.api";
import { KanbanBoard } from "../components";

export function TechnicienDashboardView() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMyInterventions().then((data) => {
      setInterventions(data);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="mb-6 text-2xl font-bold">Technicien Dashboard</h1>
      <KanbanBoard initialInterventions={interventions} />
    </div>
  );
}
