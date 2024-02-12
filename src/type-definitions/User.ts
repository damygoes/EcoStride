export type User = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  role: USER_ROLE;
  authenticated?: {
    sessionToken: string;
  };
  profile?: {
    bio: string;
    age: number;
    ftp: number;
    bikeWeight: number;
    bodyWeight: number;
  };
  location?: UserLocation;
};

export type UserLocation = string | null;

export type USER_ROLE = "USER" | "ADMIN";
