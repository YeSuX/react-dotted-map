/**
 * Example: Country Switching with Real-time Highlighting
 * Demonstrates dynamic country highlighting with interactive selection
 */

import { useState, useMemo } from "react";
import { DottedMapFactory } from "../components";
import { geojsonWorld, geojsonByCountry } from "../data";

const AVAILABLE_COUNTRIES = [
  { code: "USA", name: "United States" },
  { code: "CHN", name: "China" },
  { code: "JPN", name: "Japan" },
  { code: "GBR", name: "United Kingdom" },
  { code: "DEU", name: "Germany" },
  { code: "FRA", name: "France" },
  { code: "IND", name: "India" },
  { code: "BRA", name: "Brazil" },
  { code: "CAN", name: "Canada" },
  { code: "AUS", name: "Australia" },
  { code: "RUS", name: "Russia" },
  { code: "KOR", name: "South Korea" },
];

export default function CountryHighlightExample() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>("USA");
  const [highlightColor, setHighlightColor] = useState("#ef4444");

  // Dynamically generate countryColors based on selection
  const countryColors = useMemo(() => {
    if (!selectedCountry) return undefined;
    return {
      [selectedCountry]: highlightColor,
    };
  }, [selectedCountry, highlightColor]);

  // Available color presets
  const colorPresets = [
    { name: "Red", color: "#ef4444" },
    { name: "Blue", color: "#3b82f6" },
    { name: "Green", color: "#10b981" },
    { name: "Purple", color: "#a855f7" },
    { name: "Orange", color: "#f59e0b" },
    { name: "Pink", color: "#ec4899" },
  ];

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Country Highlight Example</h2>
      <p>Select a country to highlight it on the map in real-time</p>

      {/* Control Panel */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        {/* Country Selection */}
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="country-select"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Select Country:
          </label>
          <select
            id="country-select"
            value={selectedCountry || ""}
            onChange={(e) =>
              setSelectedCountry(e.target.value || null)
            }
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <option value="">None (Show All)</option>
            {AVAILABLE_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>

        {/* Color Selection */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Highlight Color:
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {colorPresets.map((preset) => (
              <button
                key={preset.color}
                onClick={() => setHighlightColor(preset.color)}
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    highlightColor === preset.color
                      ? preset.color
                      : "white",
                  color:
                    highlightColor === preset.color ? "white" : "#374151",
                  border: `2px solid ${preset.color}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Quick Select:
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {AVAILABLE_COUNTRIES.slice(0, 6).map((country) => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    selectedCountry === country.code
                      ? highlightColor
                      : "#e5e7eb",
                  color:
                    selectedCountry === country.code ? "white" : "#374151",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
              >
                {country.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Display */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <DottedMapFactory
          height={450}
          width={900}
          grid="square"
          spacing={5}
          countries={selectedCountry ? [selectedCountry] : undefined}
          geojsonWorld={geojsonWorld}
          geojsonByCountry={geojsonByCountry}
          countryColors={countryColors}
          shape="circle"
          backgroundColor="#ffffff"
          color="#cbd5e1"
          radius={1}
        />
      </div>

      {/* Status Display */}
      {selectedCountry && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            backgroundColor: `${highlightColor}15`,
            border: `2px solid ${highlightColor}`,
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <strong>Currently Highlighting:</strong>{" "}
          {AVAILABLE_COUNTRIES.find((c) => c.code === selectedCountry)?.name ||
            selectedCountry}{" "}
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: highlightColor,
              borderRadius: "50%",
              marginLeft: "8px",
              verticalAlign: "middle",
            }}
          />
        </div>
      )}
    </div>
  );
}

