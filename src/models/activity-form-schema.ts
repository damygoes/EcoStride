import { z } from "zod";

export const ActivityFormSchema = z.object({
  activityName: z
    .string()
    .min(1, { message: "Please provide a descriptive name for this activity" }),
  activityDescription: z
    .string()
    .min(1, { message: "Please describe this activity in a few words" }),
  distance: z.string().min(1, { message: "Distance is required" }),
  elevationGain: z.string().min(0, { message: "Elevation gain is required" }),
  minimumGrade: z.string().optional(),
  maximumGrade: z.string().optional(),
  averageGrade: z.string().min(0, { message: "Average grade is required" }),
  timeToComplete: z.string().optional(),
  difficultyLevel: z
    .string()
    .min(1, { message: "Please select a difficulty level" }),
  activityType: z.enum(["Hike", "Bike", "Run"]),
  routeType: z.string().min(1, { message: "Please select a route type" }),
  climbCategory: z.string().optional(),
  photos: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().min(1, { message: "Please provide a city" }),
    state: z.string().min(1, { message: "Please provide a state" }),
    country: z.string().min(1, { message: "Please provide a country" }),
    continent: z.string().min(1, { message: "Please provide a continent" }),
  }),
  startCoordinates: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
  endCoordinates: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
});

export type ActivityFormType = z.infer<typeof ActivityFormSchema>;
