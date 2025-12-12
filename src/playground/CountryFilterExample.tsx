/**
 * Example: Country Filtering and Coloring
 * Demonstrates filtering specific countries and assigning colors
 */

import { DottedMapFactory } from "../components";
import { geojsonWorld, geojsonByCountry } from "../data";

export default function CountryFilterExample() {
  const countryColors = {
    USA: "#ef4444",
    CHN: "#3b82f6",
    JPN: "#10b981",
    GBR: "#f59e0b",
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Country Filtering & Coloring Example</h2>
      <p>Render specific countries with custom colors</p>

      <DottedMapFactory
        height={400}
        width={800}
        grid="square"
        spacing={5}
        countries={["USA", "CHN", "JPN", "GBR"]}
        geojsonWorld={geojsonWorld}
        geojsonByCountry={geojsonByCountry}
        countryColors={countryColors}
        shape="circle"
        backgroundColor="#f9fafb"
        radius={1}
      />

      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        {Object.entries(countryColors).map(([country, color]) => (
          <div key={country} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: color,
                marginRight: 8,
                borderRadius: "2px",
              }}
            />
            <span style={{ fontSize: "14px" }}>{country}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


