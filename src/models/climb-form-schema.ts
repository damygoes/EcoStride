import { z } from "zod";

export const ClimbFormSchema = z.object({
  id: z.string().min(1, { message: "Climb ID must be at least 1 character" }),
  slug: z.string().min(1, { message: "Slug must be at least 1 character" }),
  climbName: z
    .string()
    .min(1, { message: "Name must be at least 1 character" }),
  climbSummary: z
    .string()
    .min(1, { message: "Summary must be at least 1 character" }),
  climbDescription: z.string().optional(),
  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z
      .string()
      .min(1, { message: "Country must be at least 1 character" }),
  }),
  photos: z.array(z.string()).optional(),
  gradient: z.object({
    average: z.string().optional(),
    max: z.string().min(1, { message: "Max grade must be at least 0%" }),
    min: z.string().min(1, { message: "Min grade must be at least 0%" }),
  }),
  elevationGain: z
    .string()
    .min(1, { message: "Elevation gain must be at least 0" }),
  distance: z
    .string()
    .min(1, { message: "Distance must be at least 100metres" }),
  category: z.string().min(1, {
    message: "Category must be at least 1 character",
  }),
  tags: z.string().optional(),
  startLocation: z
    .object({
      latitude: z.string(),
      longitude: z.string(),
    })
    .optional(),
  endLocation: z
    .object({
      latitude: z.string(),
      longitude: z.string(),
    })
    .optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ClimbFormType = z.infer<typeof ClimbFormSchema>;
