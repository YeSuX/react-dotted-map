/**
 * Example: Grid Types and Shapes Comparison
 * Demonstrates different grid layouts and shape options
 */

import { DottedMapFactory } from "../components";
import { geojsonWorld } from "../data";
import type { GridType, ShapeType } from "../services/types";

interface GridShapeConfig {
  grid: GridType;
  shape: ShapeType;
  title: string;
  color: string;
}

export default function GridShapeExample() {
  const configurations: GridShapeConfig[] = [
    {
      grid: "square",
      shape: "circle",
      title: "Square Grid + Circle",
      color: "#3b82f6",
    },
    {
      grid: "diagonal",
      shape: "circle",
      title: "Diagonal Grid + Circle",
      color: "#10b981",
    },
    {
      grid: "vertical",
      shape: "circle",
      title: "Vertical Grid + Circle",
      color: "#f59e0b",
    },
    {
      grid: "square",
      shape: "hexagon",
      title: "Square Grid + Hexagon",
      color: "#8b5cf6",
    },
  ];

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Grid Types & Shapes Comparison</h2>
      <p>Explore different grid layouts and dot shapes</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "24px",
          marginTop: "20px",
        }}
      >
        {configurations.map((config) => (
          <div
            key={`${config.grid}-${config.shape}`}
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
                fontSize: "14px",
                color: config.color,
              }}
            >
              {config.title}
            </h3>
            <DottedMapFactory
              height={200}
              width={400}
              grid={config.grid}
              spacing={8}
              geojsonWorld={geojsonWorld}
              shape={config.shape}
              color={config.color}
              backgroundColor="#ffffff"
              radius={0.8}
            />
            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#64748b",
                display: "flex",
                gap: "12px",
              }}
            >
              <span>
                Grid: <strong>{config.grid}</strong>
              </span>
              <span>
                Shape: <strong>{config.shape}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


