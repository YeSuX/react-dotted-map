/**
 * Example: Interactive Map with Hover and Click
 * Demonstrates interactive features with state management
 */

import { useState } from "react";
import { DottedMapFactory } from "../components";
import { geojsonWorld } from "../data";

interface City {
  name: string;
  lat: number;
  lng: number;
  population: string;
  country: string;
}

export default function InteractiveMapExample() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cities: City[] = [
    {
      name: "New York",
      lat: 40.7128,
      lng: -74.006,
      population: "8.3M",
      country: "USA",
    },
    {
      name: "London",
      lat: 51.5074,
      lng: -0.1278,
      population: "9.0M",
      country: "UK",
    },
    {
      name: "Tokyo",
      lat: 35.6762,
      lng: 139.6503,
      population: "14.0M",
      country: "Japan",
    },
    {
      name: "Paris",
      lat: 48.8566,
      lng: 2.3522,
      population: "2.2M",
      country: "France",
    },
    {
      name: "Sydney",
      lat: -33.8688,
      lng: 151.2093,
      population: "5.3M",
      country: "Australia",
    },
    {
      name: "Dubai",
      lat: 25.2048,
      lng: 55.2708,
      population: "3.4M",
      country: "UAE",
    },
  ];

  const currentCity = cities.find(
    (c) => c.name === selectedCity || c.name === hoveredCity
  );

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Interactive Map Example</h2>
      <p>Click on cities to select, hover to preview</p>

      <div style={{ position: "relative" }}>
        <DottedMapFactory
          height={400}
          width={800}
          grid="square"
          spacing={5}
          geojsonWorld={geojsonWorld}
        >
          {(instance) => {
            cities.forEach((city) => {
              const isSelected = selectedCity === city.name;
              const isHovered = hoveredCity === city.name;

              instance.addPin({
                lat: city.lat,
                lng: city.lng,
                data: city,
                svgOptions: {
                  color: isSelected
                    ? "#ef4444"
                    : isHovered
                    ? "#f59e0b"
                    : "#3b82f6",
                  radius: isSelected ? 3 : isHovered ? 2.5 : 2,
                },
              });
            });

            return (
              <div
                onClick={() => setSelectedCity(null)}
                dangerouslySetInnerHTML={{
                  __html: instance.getSVG({
                    backgroundColor: "#1e293b",
                    color: "#475569",
                    shape: "circle",
                    radius: 0.5,
                  }),
                }}
              />
            );
          }}
        </DottedMapFactory>

        {currentCity && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "12px 16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              minWidth: "200px",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
              {currentCity.name}
            </h3>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}>
              <strong>Country:</strong> {currentCity.country}
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}>
              <strong>Population:</strong> {currentCity.population}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          flexWrap: "wrap",
        }}
      >
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => setSelectedCity(city.name)}
            onMouseEnter={() => setHoveredCity(city.name)}
            onMouseLeave={() => setHoveredCity(null)}
            style={{
              padding: "6px 12px",
              backgroundColor:
                selectedCity === city.name
                  ? "#ef4444"
                  : hoveredCity === city.name
                  ? "#f59e0b"
                  : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
            {city.name}
          </button>
        ))}
      </div>

      {selectedCity && (
        <div style={{ marginTop: "12px", fontSize: "14px", color: "#64748b" }}>
          Selected: <strong>{selectedCity}</strong> (click map to deselect)
        </div>
      )}
    </div>
  );
}
