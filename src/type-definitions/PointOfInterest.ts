export type POI = {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    foursquare: string;
    landmark: boolean;
    address: string;
    category: string;
    maki: string;
  };
  text: string;
  place_name: string;
  center: [number, number];
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  context: POIContext[];
};

export type POIContext = {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  text: string;
  short_code?: string;
};
