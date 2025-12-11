/**
 * Example: Custom Region Boundaries
 * Demonstrates limiting map to specific geographic regions
 */

import { DottedMapFactory } from "../components";
import { geojsonWorld } from "../data";
import type { BoundingBox } from "../services/geojsonService";

interface RegionConfig {
  name: string;
  region: BoundingBox;
  color: string;
}

export default function CustomRegionExample() {
  const regions: RegionConfig[] = [
    {
      name: "North America",
      region: {
        lat: { min: 15, max: 72 },
        lng: { min: -170, max: -50 },
      },
      color: "#ef4444",
    },
    {
      name: "Europe",
      region: {
        lat: { min: 35, max: 71 },
        lng: { min: -10, max: 40 },
      },
      color: "#3b82f6",
    },
    {
      name: "East Asia",
      region: {
        lat: { min: 20, max: 55 },
        lng: { min: 100, max: 150 },
      },
      color: "#10b981",
    },
  ];

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Custom Region Boundaries Example</h2>
      <p>Focus on specific geographic regions with custom lat/lng bounds</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginTop: "20px",
        }}
      >
        {regions.map((config) => (
          <div
            key={config.name}
            style={{
              padding: "16px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "16px",
                color: config.color,
              }}
            >
              {config.name}
            </h3>
            <DottedMapFactory
              height={250}
              width={350}
              spacing={5}
              geojsonWorld={geojsonWorld}
              region={config.region}
              shape="circle"
              color={config.color}
              backgroundColor="#ffffff"
              radius={0.6}
            />
            <div
              style={{
                marginTop: "12px",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              <div>
                Lat: {config.region.lat.min}° to {config.region.lat.max}°
              </div>
              <div>
                Lng: {config.region.lng.min}° to {config.region.lng.max}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
