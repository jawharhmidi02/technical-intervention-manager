import api from "@/lib/api";
import {
  Technician,
  Intervention,
  CreateInterventionData,
} from "../../types/intervention.types";

export async function getTechnicians(): Promise<Technician[]> {
  const res = await api.get("/auth/technicians");
  return res.data;
}

export async function getInterventions(): Promise<Intervention[]> {
  const res = await api.get("/interventions");
  return res.data;
}

export async function createIntervention(
  data: CreateInterventionData,
): Promise<Intervention> {
  const res = await api.post("/interventions", data);
  return res.data;
}
