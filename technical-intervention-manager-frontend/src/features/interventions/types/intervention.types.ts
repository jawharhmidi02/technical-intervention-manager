import { z } from "zod";

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

export const createInterventionSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  assignedToId: z.string().min(1, "Please select a technician"),
});

export type CreateInterventionData = z.infer<typeof createInterventionSchema>;
