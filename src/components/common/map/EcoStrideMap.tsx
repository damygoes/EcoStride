import { ENV_VARIABLES } from "@lib/env";
import { POIApiResponse } from "@type-definitions/PointOfInterest";
import axios from "axios";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

type Coordinates = {
  longitude: number;
  latitude: number;
};

type EcoStrideMapProps = {
  startCoordinates: Coordinates;
  endCoordinates: Coordinates;
  setPois: (value: POIApiResponse) => void;
};

const startIcon = new L.Icon({
  iconUrl: "/assets/pin.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const endIcon = new L.Icon({
  iconUrl: "/assets/mountain-location.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const EcoStrideMap: React.FC<EcoStrideMapProps> = ({
  startCoordinates,
  endCoordinates,
  setPois,
}) => {
  const [route, setRoute] = useState<LatLngTuple[]>([]);

  const fetchRoute = useCallback(async () => {
    const apiKey = ENV_VARIABLES.OPENROUTESERVICE_API_KEY;
    const url = `${ENV_VARIABLES.OPEN_ROUTE_URL}`;

    try {
      const response = await axios.post(
        url,
        {
          coordinates: [
            [startCoordinates.longitude, startCoordinates.latitude],
            [endCoordinates.longitude, endCoordinates.latitude],
          ],
        },
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        },
      );
      const routeCoordinates: LatLngTuple[] =
        response.data.features[0].geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]] as LatLngTuple,
        );
      setRoute(routeCoordinates);
    } catch (error) {
      console.error("Failed to fetch the route:", error);
    }
  }, [startCoordinates, endCoordinates]);
  useEffect(() => {
    if (startCoordinates && endCoordinates) {
      fetchRoute();
    }
  }, [startCoordinates, endCoordinates, fetchRoute]);

  const fetchPOIS = useCallback(() => {
    const url = `${ENV_VARIABLES.OPEN_ROUTE_POIS_URL}`;
    const payload = {
      request: "pois",
      geometry: {
        bbox: [
          [startCoordinates.longitude + 0.02, startCoordinates.latitude + 0.02],
          [startCoordinates.longitude - 0.02, startCoordinates.latitude - 0.02],
        ],
        geojson: {
          type: "Point",
          coordinates: [startCoordinates.longitude, startCoordinates.latitude],
        },
        buffer: 200,
      },
    };

    axios
      .post(url, payload, {
        headers: {
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          "Content-Type": "application/json",
          Authorization: ENV_VARIABLES.OPENROUTESERVICE_API_KEY,
        },
      })
      .then((response) => {
        setPois(response.data);
      })
      .catch((error) => {
        console.error("Error fetching POIs:", error);
      });
  }, [setPois, startCoordinates.latitude, startCoordinates.longitude]);

  useEffect(() => {
    if (startCoordinates) {
      fetchPOIS();
    }
  }, [startCoordinates, fetchPOIS]);

  return (
    <MapContainer
      center={[startCoordinates.latitude, startCoordinates.longitude]}
      zoom={14}
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[startCoordinates.latitude, startCoordinates.longitude]}
        icon={startIcon}
      />
      <Marker
        position={[endCoordinates.latitude, endCoordinates.longitude]}
        icon={endIcon}
      />
      {route.length > 0 && <Polyline positions={route} color="#FF8C00" />}
    </MapContainer>
  );
};

export default EcoStrideMap;
