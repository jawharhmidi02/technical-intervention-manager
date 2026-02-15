import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Intervention,
  InterventionStatus,
} from "../../types/intervention.types";
import { InterventionCard } from "./intervention-card";

type Props = {
  title: string;
  status: InterventionStatus;
  interventions: Intervention[];
  onDragStart: (id: string) => void;
  onDrop: (status: InterventionStatus) => void;
};

export function KanbanColumn({
  title,
  status,
  interventions,
  onDragStart,
  onDrop,
}: Props) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(status);
  };

  return (
    <Card
      className="flex-1 min-w-[250px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <CardHeader>
        <CardTitle className="text-lg">
          {title}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({interventions.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {interventions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No items
            </p>
          ) : (
            interventions.map((item) => (
              <InterventionCard
                key={item.id}
                intervention={item}
                onDragStart={onDragStart}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
