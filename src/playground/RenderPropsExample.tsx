import { useState } from "react";
import DottedMap, { type MapConfig } from "../components/DottendMap";

const initialMapConfig: MapConfig = {
  points: {},
  X_MIN: -20037508.34,
  Y_MAX: 20037508.34,
  X_RANGE: 40075016.68,
  Y_RANGE: 40075016.68,
  region: "world",
  grid: "square",
  width: 800,
  height: 400,
  ystep: 1,
};

export default function RenderPropsExample() {
  const [mapConfig] = useState(initialMapConfig);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Render Props Example - Custom Pins</h2>
      <p>Using render props to add custom pins with different colors</p>
      <DottedMap map={mapConfig}>
        {(instance) => {
          // Add major cities
          instance.addPin({
            lat: 40.7128,
            lng: -74.006,
            data: { city: "New York" },
            svgOptions: { color: "#ef4444", radius: 2 },
          });

          instance.addPin({
            lat: 51.5074,
            lng: -0.1278,
            data: { city: "London" },
            svgOptions: { color: "#10b981", radius: 2 },
          });

          instance.addPin({
            lat: 35.6762,
            lng: 139.6503,
            data: { city: "Tokyo" },
            svgOptions: { color: "#8b5cf6", radius: 2 },
          });

          instance.addPin({
            lat: 48.8566,
            lng: 2.3522,
            data: { city: "Paris" },
            svgOptions: { color: "#f59e0b", radius: 2 },
          });

          instance.addPin({
            lat: -33.8688,
            lng: 151.2093,
            data: { city: "Sydney" },
            svgOptions: { color: "#06b6d4", radius: 2 },
          });

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: instance.getSVG({
                  shape: "circle",
                  backgroundColor: "#1f2937",
                  color: "#9ca3af",
                }),
              }}
            />
          );
        }}
      </DottedMap>
    </div>
  );
}

