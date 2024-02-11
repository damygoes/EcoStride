export type User = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  location?: UserLocation;
  createdAt?: string | null;
  updatedAt?: string | null;
  details?: UserDetails | null;
  role: "USER" | "ADMIN";
};

export type UserLocation = string | null;

export type UserDetails = {
  bio: string | null;
  age: number | null;
  bikeWeight: number | null;
  ftp: number | null;
  role: "USER" | "ADMIN";
  weight: number | null;
};
