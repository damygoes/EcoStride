export type User = {
  id: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  token: string | null | undefined;
  tokenExpiration: number | null | undefined;
  location?: UserLocation;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type UserLocation = string | null | undefined;
