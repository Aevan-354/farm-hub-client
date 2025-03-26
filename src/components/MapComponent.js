import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Map container styles
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// Default center location (Kenya)
const defaultCenter = {
  lat: -1.286389,
  lng: 36.817223,
};

const MapComponent = ({ lands }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={6} center={defaultCenter}>
        {lands.map((land) => (
          <Marker
            key={land.id}
            position={{ lat: parseFloat(land.latitude), lng: parseFloat(land.longitude) }}
            title={land.title}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
