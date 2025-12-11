import { useState } from "react";
import { useDottedMap } from "../components";
import { geojsonWorld } from "../data";
import { useMapFactory } from "../hooks";

export default function HookExample() {
  const [refreshKey, setRefreshKey] = useState(0);

  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 5,
    geojsonWorld,
  });

  const mapInstance = useDottedMap(map);

  const handleAddPin = () => {
    const randomLat = (Math.random() - 0.5) * 180;
    const randomLng = (Math.random() - 0.5) * 360;

    mapInstance.addPin({
      lat: randomLat,
      lng: randomLng,
      data: { timestamp: Date.now() },
      svgOptions: {
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        radius: 1.5,
      },
    });

    // Force re-render to show the new pin
    setRefreshKey((prev) => prev + 1);
  };

  const handleClearPins = () => {
    // Force re-render to clear pins by resetting the key
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Hook Example - Interactive Map</h2>
      <p>Click the button to add random pins programmatically</p>

      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={handleAddPin}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Random Pin
        </button>

        <button
          onClick={handleClearPins}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear All Pins
        </button>

        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <strong>Total Pins:</strong>
          <span style={{ marginLeft: "8px" }}>
            {mapInstance.getPoints().length}
          </span>
        </div>
      </div>

      <div
        key={refreshKey}
        dangerouslySetInnerHTML={{
          __html: mapInstance.getSVG({
            shape: "hexagon",
            backgroundColor: "#fef3c7",
            color: "#f59e0b",
            radius: 0.8,
          }),
        }}
      />
    </div>
  );
}
