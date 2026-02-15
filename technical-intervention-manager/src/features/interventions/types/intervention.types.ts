export type InterventionStatus = "todo" | "in_progress" | "done";

export type Technician = {
  id: string;
  name: string;
  email: string;
};

export type Intervention = {
  id: string;
  title: string;
  description: string;
  status: InterventionStatus;
  technicianId: string;
  technicianName: string;
  createdAt: string;
};

export type CreateInterventionData = {
  title: string;
  description: string;
  assignedToId: string;
};
