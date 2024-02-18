export type User = {
  id: string | null;
  googleId?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  role: USER_ROLE;
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
