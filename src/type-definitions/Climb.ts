export type ClimbCategory =
  | "one"
  | "two"
  | "three"
  | "four"
  | "Hors Catégorie (HC)";

export type Climb = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  minGrade: number;
  maxGrade: number;
  averageGrade: number;
  elevationGain: number;
  distance: number;
  category: ClimbCategory;
  city: string;
  state: string;
  country: string;
  tags: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  startLocation: {
    latitude: number;
    longitude: number;
  };
  endLocation: {
    latitude: number;
    longitude: number;
  };
};
