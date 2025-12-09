/**
 * UI Layer: Pin Component
 * Pure presentational component for rendering individual map pins
 * Uses Service layer for hexagon calculations, handles SVG rendering and events
 */

import { calculateHexagonPoints } from "../services/svgService";
import type { SvgOptions, ShapeType } from "../services/types";

export interface PinProps {
  x: number;
  y: number;
  shape?: ShapeType;
  radius?: number;
  color?: string;
  svgOptions?: SvgOptions;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Pin component for rendering a single point on the map
 * Supports circle and hexagon shapes with custom styling and interactions
 */
export default function Pin({
  x,
  y,
  shape = "circle",
  radius = 0.5,
  color = "currentColor",
  svgOptions,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PinProps) {
  // Calculate final styling with svgOptions override
  const pointRadius = svgOptions?.radius ?? radius;
  const pointColor = svgOptions?.color ?? color;

  // Circle shape rendering
  if (shape === "circle") {
    return (
      <circle
        cx={x}
        cy={y}
        r={pointRadius}
        fill={pointColor}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: onClick ? "pointer" : "default" }}
      />
    );
  }

  // Hexagon shape rendering
  if (shape === "hexagon") {
    // Delegate hexagon calculation to Service layer
    const polyPoints = calculateHexagonPoints(x, y, pointRadius);

    return (
      <polygon
        points={polyPoints.map((point) => point.join(",")).join(" ")}
        fill={pointColor}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: onClick ? "pointer" : "default" }}
      />
    );
  }

  return null;
}
