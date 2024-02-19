// export type POI = {
//   id: string;
//   type: string;
//   place_type: string[];
//   relevance: number;
//   properties: {
//     foursquare: string;
//     landmark: boolean;
//     address: string;
//     category: string;
//     maki: string;
//   };
//   text: string;
//   place_name: string;
//   center: [number, number];
//   geometry: {
//     coordinates: [number, number];
//     type: string;
//   };
//   context: POIContext[];
// };

// export type POIContext = {
//   id: string;
//   mapbox_id: string;
//   wikidata?: string;
//   text: string;
//   short_code?: string;
// };

export type POIApiResponse = {
  type: string;
  bbox: [number, number, number, number];
  features: Feature[];
  information: {
    attribution: string;
    version: string;
    timestamp: number;
    query: {
      request: string;
      geometry: {
        bbox: [[number, number], [number, number]];
        geojson: {
          type: string;
          coordinates: [number, number];
        };
        buffer: number;
      };
    };
  };
};

export type Feature = {
  type: string;
  geometry: Geometry;
  properties: Properties;
};

type Geometry = {
  type: string;
  coordinates: [number, number];
};

type Properties = {
  osm_id: number;
  osm_type: number;
  distance: number;
  category_ids: {
    [key: number]: Category;
  };
  osm_tags?: OsmTags;
};

export type Category = {
  category_name: string;
  category_group: string;
};

type OsmTags = {
  name?: string;
  opening_hours?: string;
  website?: string;
  wheelchair?: string;
  phone?: string;
  fee?: string;
};

export type transformedCategory = {
  featureCategoryName: string;
  featureCategoryGroup: string;
};
