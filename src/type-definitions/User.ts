export type User = {
  id: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
  avatar: string | null | undefined;
  location?: UserLocation;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type UserLocation = string | null | undefined;

export type UserDetails = {
  bio: string | null;
  age: number | null;
  bikeWeight: number | null;
  ftp: number | null;
  role: "USER" | "ADMIN";
  weight: number | null;
};
