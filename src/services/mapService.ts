/**
 * Map Service Layer
 * Pure business logic for coordinate transformations and map calculations
 * No React dependencies - fully testable in isolation
 */

import proj4 from "proj4";
import inside from "@turf/boolean-point-in-polygon";
import type {
  ScreenCoords,
  LatLngToScreenParams,
  ScreenCoordsToLatLngParams,
  PolygonType,
} from "./types";

// Projection definitions
const GOOGLE_PROJ =
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs";
const WGS84_PROJ = "+proj=longlat +datum=WGS84 +no_defs";

/**
 * Project coordinates from one projection to another
 * @param lng - Longitude
 * @param lat - Latitude
 * @param fromProj - Source projection string
 * @param toProj - Target projection string
 * @returns Projected coordinates [x, y]
 */
export function projectCoordinates(
  lng: number,
  lat: number,
  fromProj: string,
  toProj: string
): [number, number] {
  const result = proj4(fromProj, toProj, [lng, lat]);
  return [result[0], result[1]] as [number, number];
}

/**
 * Check if a point is inside a polygon boundary
 * @param point - Point coordinates [lng, lat]
 * @param polygon - GeoJSON polygon or feature
 * @returns true if point is inside polygon
 */
export function isPointInPolygon(
  point: [number, number],
  polygon: PolygonType
): boolean {
  return inside(point, polygon);
}

/**
 * Convert latitude/longitude to screen coordinates
 * Core algorithm for mapping geographic coordinates to pixel space
 * @param params - Conversion parameters including lat, lng, and map config
 * @returns Screen coordinates with lat/lng, or undefined if outside polygon
 */
export function latLngToScreenCoords({
  lat,
  lng,
  mapConfig,
  avoidOuterPins = false,
  polygon,
}: LatLngToScreenParams): ScreenCoords | undefined {
  const { X_MIN, Y_MAX, X_RANGE, Y_RANGE, grid, width, height, ystep } =
    mapConfig;

  // Step 1: Convert lat/lng to Google Mercator projection
  const googleCoords = proj4(GOOGLE_PROJ, [lng, lat]);
  const [googleX, googleY] = [googleCoords[0], googleCoords[1]];

  // Step 2: Check polygon boundary if required
  if (avoidOuterPins && polygon) {
    const wgs84Coords = proj4(GOOGLE_PROJ, WGS84_PROJ, [googleX, googleY]);
    const wgs84Point: [number, number] = [wgs84Coords[0], wgs84Coords[1]];
    if (!isPointInPolygon(wgs84Point, polygon)) {
      return undefined;
    }
  }

  // Step 3: Convert to raw screen coordinates
  let rawX = (width * (googleX - X_MIN)) / X_RANGE;
  const rawY = (height * (Y_MAX - googleY)) / Y_RANGE;

  // Step 4: Apply grid adjustment (diagonal grid has offset for even rows)
  const y = Math.round(rawY / ystep);
  if (y % 2 === 0 && grid === "diagonal") {
    rawX -= 0.5;
  }

  // Step 5: Round to nearest grid point
  const x = Math.round(rawX);
  let localx = x;
  const localy = Math.round(y) * ystep;

  // Step 6: Restore offset for diagonal grid
  if (y % 2 === 0 && grid === "diagonal") {
    localx += 0.5;
  }

  // Step 7: Convert screen coordinates back to lat/lng (snapped to grid)
  const localCoords = proj4(GOOGLE_PROJ, WGS84_PROJ, [
    (localx * X_RANGE) / width + X_MIN,
    Y_MAX - (localy * Y_RANGE) / height,
  ]);
  const [localLng, localLat] = [localCoords[0], localCoords[1]];

  return {
    x: localx,
    y: localy,
    lat: localLat,
    lng: localLng,
  };
}

/**
 * Convert screen coordinates to latitude/longitude
 * Inverse operation of latLngToScreenCoords
 * @param params - Screen coordinates and map config
 * @returns Geographic coordinates
 */
export function screenCoordsToLatLng({
  x,
  y,
  mapConfig,
}: ScreenCoordsToLatLngParams): [number, number] {
  const { X_MIN, Y_MAX, X_RANGE, Y_RANGE, width, height } = mapConfig;

  const result = proj4(GOOGLE_PROJ, WGS84_PROJ, [
    (x * X_RANGE) / width + X_MIN,
    Y_MAX - (y * Y_RANGE) / height,
  ]);
  
  return [result[0], result[1]] as [number, number];
}

