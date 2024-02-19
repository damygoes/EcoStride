import { EndMapPin, StartMapPin } from "@assets/Icons"; // Assuming these are React components
import { ENV_VARIABLES } from "@lib/env"; // Ensure this properly imports your environment variables
import polyline from "@mapbox/polyline";
import { useQuery } from "@tanstack/react-query";
import { POI } from "@type-definitions/PointOfInterest";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";

type Coordinates = {
  longitude: number;
  latitude: number;
};

type SummitSeekersMapProps = {
  startCoordinates: Coordinates;
  endCoordinates?: Coordinates;
  setPois: (pois: POI[]) => void;
};

type GeoJSONFeature = {
  type: "Feature";
  properties: object;
  geometry: {
    type: "LineString";
    coordinates: number[][]; // Array of [longitude, latitude] pairs
  };
};

type Coordinate = [number, number]; // Represents [latitude, longitude]

function SummitSeekersMap({
  startCoordinates,
  endCoordinates,
  setPois,
}: SummitSeekersMapProps) {
  // const { setPois } = usePointOfInterest();
  const ZOOM_LEVEL = 14;
  const mapboxDirectionUrl = `/api/directions/v5/mapbox/cycling/${startCoordinates.longitude},${startCoordinates.latitude};${endCoordinates?.longitude},${endCoordinates?.latitude}`;

  const { data: MapboxResponse } = useQuery({
    queryKey: ["mapbox-route-request"],
    queryFn: async () => {
      const response = await axios.get(mapboxDirectionUrl, {
        params: {
          access_token: ENV_VARIABLES.MAPBOX_ACCESS_TOKEN,
        },
      });
      return response.data;
    },
    enabled: !!startCoordinates && !!endCoordinates,
    staleTime: 0,
  });

  // Decode polyline and convert to GeoJSON format
  const [routeGeoJSON, setRouteGeoJSON] = useState<GeoJSONFeature | null>(null);

  useEffect(() => {
    if (MapboxResponse?.routes?.[0]?.geometry) {
      const decodedPolyline: Coordinate[] = polyline
        .decode(MapboxResponse.routes[0].geometry)
        .map(([lat, lng]): Coordinate => [lng, lat]);
      const geoJSON: GeoJSONFeature = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: decodedPolyline,
        },
      };
      setRouteGeoJSON(geoJSON);
    }
  }, [MapboxResponse]);

  useEffect(() => {
    const fetchPOIs = async () => {
      const bbox = [
        startCoordinates.longitude,
        startCoordinates.latitude,
        endCoordinates?.longitude,
        endCoordinates?.latitude,
      ].join(",");
      const poisUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/cafe.json?bbox=${bbox}&access_token=${ENV_VARIABLES.MAPBOX_ACCESS_TOKEN}`;

      try {
        const response = await axios.get(poisUrl);
        setPois(response.data.features); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Failed to fetch POIs", error);
      }
    };

    if (startCoordinates && endCoordinates) {
      fetchPOIs();
    }
  }, [startCoordinates, endCoordinates, setPois]);

  return (
    <Map
      mapboxAccessToken={ENV_VARIABLES.MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: startCoordinates.longitude,
        latitude: startCoordinates.latitude,
        zoom: ZOOM_LEVEL,
      }}
      style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={startCoordinates.longitude}
        latitude={startCoordinates.latitude}
        anchor="bottom"
      >
        <StartMapPin />
      </Marker>
      {endCoordinates && (
        <Marker
          longitude={endCoordinates.longitude}
          latitude={endCoordinates.latitude}
          anchor="bottom"
        >
          <EndMapPin />
        </Marker>
      )}
      {routeGeoJSON && (
        <Source id="route" type="geojson" data={routeGeoJSON}>
          <Layer
            id="route-layer"
            type="line"
            source="route"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#4fbbbb",
              // "line-color": "#3887be",
              "line-width": 5,
            }}
          />
        </Source>
      )}
      <NavigationControl position="top-right" />
    </Map>
  );
}

export default SummitSeekersMap;
