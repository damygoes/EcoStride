export type Climb = {
  id: string;
  name: string;
  slug: string;
  description: string;
  minGrade: number;
  maxGrade: number;
  averageGrade: number;
  elevationGain: number;
  distance: number;
  city: string;
  state: string;
  country: string;
  tags: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
};
