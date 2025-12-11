/**
 * UI Layer: DottedMap Component
 * Pure presentational component - no business logic
 * Delegates all logic to useDottedMap hook
 *
 * Hybrid rendering approach:
 * - Canvas layer: Base map points (high performance)
 * - SVG layer: User-added pins (interactive)
 */

import { useRef, useEffect, type ReactNode } from "react";
import { useDottedMap } from "../hooks/useDottedMap";
import Pin from "./Pin";
import type { MapConfig, PolygonType, ShapeType } from "../services/types";

export interface DottedMapProps<TData = unknown> {
  map: MapConfig<TData>;
  avoidOuterPins?: boolean;
  polygon?: PolygonType;
  children?: (instance: ReturnType<typeof useDottedMap<TData>>) => ReactNode;
  shape?: ShapeType;
  color?: string;
  backgroundColor?: string;
  radius?: number;
  countryColors?: Record<string, string>;
}

/**
 * DottedMap component with two rendering modes:
 * 1. Render props: Pass children function to get full control via instance
 * 2. Auto-render: Hybrid Canvas (base map) + SVG (user pins) rendering
 */
function DottedMap<TData = unknown>({
  map,
  avoidOuterPins = false,
  polygon,
  children,
  shape = "circle",
  color = "current",
  backgroundColor = "transparent",
  radius = 0.5,
  countryColors,
}: DottedMapProps<TData>) {
  // Delegate all logic to Hook layer
  const instance = useDottedMap<TData>(map, avoidOuterPins, polygon);

  // Canvas ref for base map rendering
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Effect to draw base map on canvas (always called for consistent Hook ordering)
  useEffect(() => {
    if (!canvasRef.current || children) return;

    instance.drawCanvas({
      canvas: canvasRef.current,
      shape,
      color,
      backgroundColor,
      radius,
      countryColors,
    });
  }, [
    instance,
    shape,
    color,
    backgroundColor,
    radius,
    countryColors,
    children,
  ]);

  // Render props mode: Give full control to parent
  if (children) {
    return <>{children(instance)}</>;
  }

  // Auto-render mode: Hybrid Canvas + SVG rendering
  // Get user pins for SVG layer
  const userPins = instance.getUserPins();

  return (
    <div style={{ position: "relative", width: map.width, height: map.height }}>
      {/* Canvas layer: Base map points */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* SVG layer: User pins with interactivity */}
      {userPins.length > 0 && (
        <svg
          viewBox={`0 0 ${map.width} ${map.height}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {userPins.map((pin, index) => (
            <Pin
              key={`${pin.x}-${pin.y}-${index}`}
              x={pin.x}
              y={pin.y}
              shape={shape}
              radius={radius}
              color={color}
              svgOptions={pin.svgOptions}
            />
          ))}
        </svg>
      )}
    </div>
  );
}

export default DottedMap;
