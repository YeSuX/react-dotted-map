/**
 * Example: Region Comparison
 * Demonstrates comparing different countries/regions with custom colors
 */

import { DottedMapFactory } from "../components";
import { geojsonWorld, geojsonByCountry } from "../data";

export default function RegionComparisonExample() {
  const countryColors = {
    USA: "#ef4444",
    CHN: "#3b82f6",
    IND: "#10b981",
    BRA: "#f59e0b",
  };

  const countryData = [
    { code: "USA", name: "United States", gdp: "$25.5T", population: "333M" },
    { code: "CHN", name: "China", gdp: "$17.9T", population: "1.4B" },
    { code: "IND", name: "India", gdp: "$3.7T", population: "1.4B" },
    { code: "BRA", name: "Brazil", gdp: "$1.9T", population: "215M" },
  ];

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Region Comparison Example</h2>
      <p>Compare major economies with color-coded regions</p>

      <DottedMapFactory
        height={400}
        width={800}
        grid="square"
        spacing={5}
        countries={Object.keys(countryColors)}
        geojsonWorld={geojsonWorld}
        geojsonByCountry={geojsonByCountry}
        countryColors={countryColors}
        shape="hexagon"
        radius={1.5}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {countryData.map((country) => (
          <div
            key={country.code}
            style={{
              padding: "12px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: `4px solid ${
                countryColors[country.code as keyof typeof countryColors]
              }`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor:
                    countryColors[country.code as keyof typeof countryColors],
                  marginRight: 8,
                  borderRadius: "2px",
                }}
              />
              <strong style={{ fontSize: "14px" }}>{country.name}</strong>
            </div>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#64748b" }}>
              GDP: {country.gdp}
            </p>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#64748b" }}>
              Pop: {country.population}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


