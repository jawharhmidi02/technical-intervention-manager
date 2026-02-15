"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Technician } from "../../types/intervention.types";
import { createIntervention } from "../api/intervention.api";
import {
  Intervention,
  CreateInterventionData,
  createInterventionSchema,
} from "../../types/intervention.types";

type Props = {
  technicians: Technician[];
  onCreated: (intervention: Intervention) => void;
};

export function CreateInterventionForm({ technicians, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateInterventionData>({
    resolver: zodResolver(createInterventionSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedToId: "",
    },
  });

  const onSubmit = async (data: CreateInterventionData) => {
    try {
      const intervention = await createIntervention(data);
      onCreated(intervention);
      reset();
    } catch (error) {
      console.error("Create intervention error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Intervention</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Input placeholder="Title" {...register("title")} />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input placeholder="Description" {...register("description")} />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              {...register("assignedToId")}
            >
              <option value="">Select technician</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.assignedToId && (
              <span className="text-sm text-red-500">
                {errors.assignedToId.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Create Intervention"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
