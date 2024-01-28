export type ClimbCategory =
  | "one"
  | "two"
  | "three"
  | "four"
  | "Hors Catégorie (HC)";

export type Climb = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description?: string;
  gradient: {
    minGrade: number;
    maxGrade: number;
    averageGrade?: number;
  };
  elevationGain: number;
  distance: number;
  category: ClimbCategory;
  location: { city?: string; state?: string; country: string };
  tags?: string[];
  photos?: string[];
  createdAt: string;
  updatedAt: string;
  startLocation?: {
    latitude: number;
    longitude: number;
  };
  endLocation?: {
    latitude: number;
    longitude: number;
  };
};
