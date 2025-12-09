/**
 * SVG Service Layer
 * Pure functions for generating SVG strings and calculating shape paths
 * No React dependencies - fully testable
 */

import type { PinPoint, GetSVGParams, ShapeType } from "./types";

/**
 * Generate SVG path string for a circle
 * @param x - Center x coordinate
 * @param y - Center y coordinate
 * @param radius - Circle radius
 * @param color - Fill color
 * @returns SVG circle element string
 */
export function generateCirclePath(
    x: number,
    y: number,
    radius: number,
    color: string
): string {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" />`;
}

/**
 * Calculate hexagon vertex points
 * Returns 6 points forming a regular hexagon centered at (x, y)
 * @param x - Center x coordinate
 * @param y - Center y coordinate
 * @param radius - Distance from center to vertex
 * @returns Array of [x, y] coordinate pairs
 */
export function calculateHexagonPoints(
    x: number,
    y: number,
    radius: number
): number[][] {
    const sqrt3radius = Math.sqrt(3) * radius;

    return [
        [x + sqrt3radius, y - radius],
        [x + sqrt3radius, y + radius],
        [x, y + 2 * radius],
        [x - sqrt3radius, y + radius],
        [x - sqrt3radius, y - radius],
        [x, y - 2 * radius],
    ];
}

/**
 * Generate SVG path string for a hexagon
 * @param points - Array of [x, y] coordinates for vertices
 * @param color - Fill color
 * @returns SVG polyline element string
 */
export function generateHexagonPath(
    points: number[][],
    color: string
): string {
    const pointsStr = points.map((point) => point.join(",")).join(" ");
    return `<polyline points="${pointsStr}" fill="${color}" />`;
}

/**
 * Generate SVG element for a single pin point
 * @param point - Pin point data
 * @param shape - Shape type (circle or hexagon)
 * @param defaultColor - Default fill color
 * @param defaultRadius - Default radius
 * @returns SVG element string
 */
export function generatePinSVG<TData>(
    point: PinPoint<TData>,
    shape: ShapeType,
    defaultColor: string,
    defaultRadius: number
): string {
    const { x, y, svgOptions = {} } = point;
    const radius = svgOptions.radius ?? defaultRadius;
    const color = svgOptions.color ?? defaultColor;

    if (shape === "circle") {
        return generateCirclePath(x, y, radius, color);
    } else if (shape === "hexagon") {
        const hexPoints = calculateHexagonPoints(x, y, radius);
        return generateHexagonPath(hexPoints, color);
    }

    return "";
}

/**
 * Generate complete SVG document for the map
 * @param points - Array of pin points to render
 * @param params - SVG generation parameters
 * @param width - Map width
 * @param height - Map height
 * @returns Complete SVG string
 */
export function generateMapSVG<TData>(
    points: PinPoint<TData>[],
    params: GetSVGParams,
    width: number,
    height: number
): string {
    const {
        shape = "circle",
        color = "current",
        backgroundColor = "transparent",
        radius = 0.5,
    } = params;

    const pinElements = points
        .map((point) => generatePinSVG(point, shape, color, radius))
        .join("\n");

    return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor}">
        ${pinElements}
      </svg>`;
}

