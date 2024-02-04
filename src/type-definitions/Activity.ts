export type Activity = {
  id: string;
  slug: string;
  name: string;
  description: string;
  distance: number;
  elevationGain: number;
  minimumGrade?: number;
  maximumGrade?: number;
  averageGrade: number;
  timeToComplete?: number;
  difficultyLevel: DifficultyLevel;
  activityType: ActivityType;
  routeType: RouteType;
  climbCategory?: ClimbCategory;
  photos?: string[];
  tags?: string[];
  address: Address;
  startCoordinates?: Coordinates;
  endCoordinates?: Coordinates;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: number;
  street?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
};

export type Coordinates = {
  id: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type DifficultyLevel =
  | "Easy"
  | "Moderate"
  | "Hard"
  | "Very Hard"
  | "Extremely Hard";

export type ActivityType = "Run" | "Bike" | "Hike";

export type RouteType = "Flat" | "Rolling" | "Hilly";

export type ClimbCategory = "Four" | "Three" | "Two" | "One" | "Hors Categorie";

export type Continent =
  | "Africa"
  | "Antarctica"
  | "Asia"
  | "Europe"
  | "North America"
  | "Oceania"
  | "South America";
