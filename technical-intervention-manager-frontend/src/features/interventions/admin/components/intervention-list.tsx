import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Intervention } from "../../types/intervention.types";

type Props = {
  interventions: Intervention[];
};

const statusLabel: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const statusColor: Record<string, string> = {
  todo: "bg-gray-200 text-gray-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800",
};

export function InterventionList({ interventions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Interventions</CardTitle>
      </CardHeader>
      <CardContent>
        {interventions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No interventions yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {interventions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Assigned to: {item.technicianName}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[item.status]}`}
                  >
                    {statusLabel[item.status]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
