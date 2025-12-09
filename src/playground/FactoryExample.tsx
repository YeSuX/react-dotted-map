/**
 * Example: Using DottedMapFactory
 * Demonstrates how to create a map directly from GeoJSON data
 */

import { DottedMapFactory } from "../components";
import { geojsonWorld, geojsonByCountry } from "../data";

/**
 * Example 1: World map with auto-render
 */
export function WorldMapExample() {
  return (
    <div>
      <h2>World Map</h2>
      <DottedMapFactory
        width={800}
        height={400}
        spacing={2}
        geojsonWorld={geojsonWorld}
        shape="circle"
        color="#0ea5e9"
        backgroundColor="#f0f9ff"
        radius={0.5}
      />
    </div>
  );
}

/**
 * Example 2: Specific countries with custom region
 */
export function CountriesMapExample() {
  return (
    <div>
      <h2>Selected Countries (China & USA)</h2>
      <DottedMapFactory
        width={600}
        height={400}
        spacing={2}
        countries={["CHN", "USA"]}
        geojsonByCountry={geojsonByCountry}
        grid="diagonal"
        shape="hexagon"
        color="#8b5cf6"
        radius={0.8}
      />
    </div>
  );
}

/**
 * Example 3: Using render props for custom rendering
 */
export function CustomRenderExample() {
  return (
    <div>
      <h2>Custom Render with Major Cities</h2>
      <DottedMapFactory
        width={800}
        height={400}
        spacing={2}
        geojsonWorld={geojsonWorld}
        grid="vertical"
      >
        {(instance) => {
          // Add major cities as pins
          const cities = [
            { lat: 39.9042, lng: 116.4074, name: "Beijing" },
            { lat: 40.7128, lng: -74.006, name: "New York" },
            { lat: 51.5074, lng: -0.1278, name: "London" },
            { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
            { lat: -33.8688, lng: 151.2093, name: "Sydney" },
          ];

          cities.forEach((city) => {
            instance.addPin({
              lat: city.lat,
              lng: city.lng,
              data: { city: city.name },
              svgOptions: { color: "#ef4444", radius: 2 },
            });
          });

          return (
            <div>
              <p>
                Map: {instance.image.width} x {instance.image.height} | Total
                base points: {instance.getPoints().length}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: instance.getSVG({
                    shape: "circle",
                    color: "#94a3b8",
                    radius: 0.4,
                  }),
                }}
              />
            </div>
          );
        }}
      </DottedMapFactory>
    </div>
  );
}

/**
 * Example 4: Custom region - Asia
 */
export function RegionMapExample() {
  return (
    <div>
      <h2>Asia-Pacific Region</h2>
      <DottedMapFactory
        width={800}
        height={500}
        spacing={2}
        geojsonWorld={geojsonWorld}
        region={{
          lat: { min: -10, max: 55 },
          lng: { min: 60, max: 150 },
        }}
        shape="circle"
        color="#22c55e"
        radius={0.5}
      />
    </div>
  );
}

/**
 * Example 5: Country-specific colors
 */
export function CountryColorsExample() {
  return (
    <div>
      <h2>World Map with Country Colors</h2>
      <DottedMapFactory
        width={800}
        height={400}
        spacing={2}
        geojsonWorld={geojsonWorld}
        geojsonByCountry={geojsonByCountry}
        shape="circle"
        color="#94a3b8"
        backgroundColor="#f8fafc"
        radius={0.5}
        countryColors={{
          CHN: "#ef4444",
          USA: "#3b82f6",
          RUS: "#8b5cf6",
          IND: "#f59e0b",
          BRA: "#10b981",
          AUS: "#ec4899",
          CAN: "#06b6d4",
          JPN: "#f97316",
          GBR: "#14b8a6",
          FRA: "#6366f1",
        }}
      />
    </div>
  );
}

/**
 * Combined example showcase
 */
export default function FactoryExample() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>DottedMapFactory Examples</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <WorldMapExample />
        <CountriesMapExample />
        <CustomRenderExample />
        <RegionMapExample />
        <CountryColorsExample />
      </div>
    </div>
  );
}
