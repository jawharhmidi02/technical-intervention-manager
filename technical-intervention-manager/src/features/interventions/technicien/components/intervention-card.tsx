import { Intervention } from "../../types/intervention.types";

type Props = {
  intervention: Intervention;
  onDragStart: (id: string) => void;
};

export function InterventionCard({ intervention, onDragStart }: Props) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(intervention.id)}
      className="cursor-grab rounded-md border bg-background p-3 shadow-sm active:cursor-grabbing"
    >
      <p className="text-sm font-medium">{intervention.title}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {intervention.description}
      </p>
    </div>
  );
}
