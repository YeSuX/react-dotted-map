import type { SvgOptions } from "./DottendMap";

export interface PinProps {
  x: number;
  y: number;
  shape?: "circle" | "hexagon";
  radius?: number;
  color?: string;
  svgOptions?: SvgOptions;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

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
  const pointRadius = svgOptions?.radius || radius;
  const pointColor = svgOptions?.color || color;

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

  if (shape === "hexagon") {
    const sqrt3radius = Math.sqrt(3) * pointRadius;
    const polyPoints = [
      [x + sqrt3radius, y - pointRadius],
      [x + sqrt3radius, y + pointRadius],
      [x, y + 2 * pointRadius],
      [x - sqrt3radius, y + pointRadius],
      [x - sqrt3radius, y - pointRadius],
      [x, y - 2 * pointRadius],
    ];

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
