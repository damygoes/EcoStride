import { z } from "zod";

export const UserProfileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),
  avatar: z.string().url("Invalid URL"),
  profile: z.object({
    bio: z.string().max(200, "Bio must be less than 200 characters"),
    age: z.string().min(1, "Age must be at least 1 character"),
    ftp: z.string().min(1, "FTP must be at least 1 character"),
    bodyWeight: z.string().min(1, "Body weight must be at least 1 character"),
    bikeWeight: z.string().min(1, "Bike weight must be at least 1 character"),
  }),
});

export type UserProfileFormType = z.infer<typeof UserProfileFormSchema>;

export type UserProfileFormSchemaTransformedValues = Omit<
  UserProfileFormType,
  "id" | "role"
> & {
  profile: {
    bio: string;
    age: number;
    ftp: number;
    bodyWeight: number;
    bikeWeight: number;
  };
};
