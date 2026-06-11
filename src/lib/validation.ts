import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(160)
  .optional()
  .transform((value) => (value === "" ? undefined : value));

export const createProducerSchema = z.object({
  fullName: z.string().trim().min(3).max(120),
  documentNumber: optionalText,
  phone: optionalText,
  department: z.string().trim().min(2).max(80).default("Boyaca"),
  municipality: optionalText,
  village: optionalText,
  notes: z.string().trim().max(500).optional(),
});

export const createFarmSchema = z.object({
  producerId: z.string().trim().min(1),
  name: z.string().trim().min(3).max(120),
  department: z.string().trim().min(2).max(80).default("Boyaca"),
  municipality: optionalText,
  village: optionalText,
  altitudeM: z.coerce.number().int().positive().optional(),
  areaHa: z.coerce.number().positive().optional(),
});

export const createPlotSchema = z.object({
  farmId: z.string().trim().min(1),
  name: z.string().trim().min(3).max(120),
  crop: z.string().trim().min(2).max(80),
  areaHa: z.coerce.number().positive().optional(),
  plantedAt: z.string().date().optional(),
  status: z.string().trim().min(2).max(80).default("MONITORED"),
});

export const createSensorSchema = z.object({
  plotId: z.string().trim().min(1),
  name: z.string().trim().min(3).max(120),
  type: z.enum(["SOIL_MOISTURE", "AMBIENT_TEMPERATURE", "AMBIENT_HUMIDITY"]),
  unit: z.string().trim().min(1).max(12),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]).default("ACTIVE"),
  relativeLocation: optionalText,
});

export const createReadingSchema = z.object({
  sensorId: z.string().trim().min(1),
  value: z.coerce.number(),
  unit: z.string().trim().min(1).max(12),
  origin: z.enum(["SIMULATED", "DEVICE", "MANUAL"]).default("MANUAL"),
  takenAt: z.string().datetime().optional(),
});

export const updateAlertStatusSchema = z.object({
  alertId: z.string().trim().min(1),
  status: z.enum(["ACKNOWLEDGED", "RESOLVED"]),
});

export const createFieldDecisionSchema = z.object({
  farmId: z.string().trim().min(1),
  plotId: z.string().trim().min(1),
  alertId: optionalText,
  userId: optionalText,
  status: z.enum(["APPLIED", "DISCARDED", "PENDING_REVIEW"]),
  title: z.string().trim().min(3).max(120),
  actionTaken: z.string().trim().min(3).max(500),
  reason: z.string().trim().min(3).max(500),
  waterImpactM3: z.coerce.number().nonnegative().optional(),
  decidedAt: z.string().datetime().optional(),
});

export type CreateProducerInput = z.infer<typeof createProducerSchema>;
export type CreateFarmInput = z.infer<typeof createFarmSchema>;
export type CreatePlotInput = z.infer<typeof createPlotSchema>;
export type CreateSensorInput = z.infer<typeof createSensorSchema>;
export type CreateReadingInput = z.infer<typeof createReadingSchema>;
export type UpdateAlertStatusInput = z.infer<typeof updateAlertStatusSchema>;
export type CreateFieldDecisionInput = z.infer<typeof createFieldDecisionSchema>;
