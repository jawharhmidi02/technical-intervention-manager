"use client";

import { useState } from "react";
import {
  Intervention,
  InterventionStatus,
} from "../../types/intervention.types";
import { updateInterventionStatus } from "../api/intervention.api";
import { KanbanColumn } from "./kanban-column";
import { Loader2 } from "lucide-react";

type Props = {
  initialInterventions: Intervention[];
};

export function KanbanBoard({ initialInterventions }: Props) {
  const [interventions, setInterventions] = useState(initialInterventions);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = async (newStatus: InterventionStatus) => {
    if (!draggedId) return;
    const item = interventions.find((i) => i.id === draggedId);
    if (!item || item.status === newStatus) {
      setDraggedId(null);
      return;
    }

    setLoading(true);
    await updateInterventionStatus(draggedId, newStatus);
    setInterventions((prev) =>
      prev.map((i) => (i.id === draggedId ? { ...i, status: newStatus } : i)),
    );
    setDraggedId(null);
    setLoading(false);
  };

  const columns: { title: string; status: InterventionStatus }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in_progress" },
    { title: "Done", status: "done" },
  ];

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
          <Loader2 className="size-8 animate-spin" />
        </div>
      )}
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            title={col.title}
            status={col.status}
            interventions={interventions.filter((i) => i.status === col.status)}
            onDragStart={setDraggedId}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
