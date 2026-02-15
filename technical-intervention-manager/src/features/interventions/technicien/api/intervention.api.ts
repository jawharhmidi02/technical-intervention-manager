import api from "@/lib/api";
import {
  Intervention,
  InterventionStatus,
} from "../../types/intervention.types";

export async function getMyInterventions(): Promise<Intervention[]> {
  const res = await api.get("/interventions/my");
  return res.data;
}

export async function updateInterventionStatus(
  id: string,
  status: InterventionStatus,
): Promise<Intervention> {
  const res = await api.patch(`/interventions/${id}/status`, { status });
  return res.data;
}
