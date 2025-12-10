/**
 * Canvas Service Layer
 * Pure functions for rendering map points on canvas
 * Optimized for high-performance rendering of large point sets
 */

import type { PinPoint, ShapeType } from "./types";
import { calculateHexagonPoints } from "./svgService";

/**
 * Draw a circle on canvas
 */
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Draw a hexagon on canvas
 */
export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void {
  const points = calculateHexagonPoints(x, y, radius);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
  ctx.fill();
}

/**
 * Draw a single point on canvas
 */
export function drawPoint<TData>(
  ctx: CanvasRenderingContext2D,
  point: PinPoint<TData>,
  shape: ShapeType,
  defaultColor: string,
  defaultRadius: number,
  countryColors?: Record<string, string>
): void {
  const { x, y, svgOptions = {}, countryCode } = point;
  const radius = svgOptions.radius ?? defaultRadius;

  // Priority: svgOptions.color > countryColors[countryCode] > defaultColor
  let color = svgOptions.color;
  if (!color && countryCode && countryColors?.[countryCode]) {
    color = countryColors[countryCode];
  }
  if (!color) {
    color = defaultColor;
  }

  if (shape === "circle") {
    drawCircle(ctx, x, y, radius, color);
  } else if (shape === "hexagon") {
    drawHexagon(ctx, x, y, radius, color);
  }
}

/**
 * Draw all base map points on canvas
 * This is the main performance-critical rendering function
 */
export function drawMapOnCanvas<TData>(
  canvas: HTMLCanvasElement,
  points: PinPoint<TData>[],
  shape: ShapeType,
  color: string,
  backgroundColor: string,
  radius: number,
  countryColors?: Record<string, string>
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Handle high-DPI displays
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);

  // Clear and set background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Draw all points
  points.forEach((point) => {
    drawPoint(ctx, point, shape, color, radius, countryColors);
  });
}
