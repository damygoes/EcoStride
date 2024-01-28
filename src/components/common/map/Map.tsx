import { EndMapPin, StartMapPin } from "@assets/Icons";
import { ENV_VARIABLES } from "@lib/env";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";

type Coordinates = {
  longitude: number | null;
  latitude: number | null;
};

type SummitSeekersMapProps = {
  startCoordinates: Coordinates;
  endCoordinates?: Coordinates;
};

function SummitSeekersMap({
  startCoordinates,
  endCoordinates,
}: SummitSeekersMapProps) {
  const ZOOM_LEVEL = 10;
  const [startViewport] = useState({
    longitude: startCoordinates.longitude ?? -122.4194,
    latitude: startCoordinates.latitude ?? 37.7749,
  });
  const [endViewPort] = useState({
    longitude: endCoordinates?.longitude ?? -122.4194,
    latitude: endCoordinates?.latitude ?? 37.7749,
  });

  return (
    <Map
      mapboxAccessToken={ENV_VARIABLES.MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: startViewport.longitude,
        latitude: startViewport.latitude,
        zoom: ZOOM_LEVEL,
      }}
      style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={startViewport.longitude}
        latitude={startViewport.latitude}
        anchor="bottom"
      >
        <StartMapPin />
      </Marker>
      <Marker
        longitude={endViewPort.longitude}
        latitude={endViewPort.latitude}
        anchor="bottom"
      >
        <EndMapPin />
      </Marker>
      <NavigationControl />
    </Map>
  );
}

export default SummitSeekersMap;
