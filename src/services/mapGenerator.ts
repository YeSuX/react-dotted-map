/**
 * Map Generator Service Layer
 * Core algorithm for generating dotted maps from GeoJSON data
 * Converts geographic regions into grid-based point maps
 */

import proj4 from "proj4";
import inside from "@turf/boolean-point-in-polygon";
import type { FeatureCollection, Feature } from "geojson";
import type { MapConfig, GridType, PinPoint } from "./types";
import type { BoundingBox } from "./geojsonService";
import {
  geojsonToMultiPolygons,
  computeGeojsonBox,
  createCountriesFeatureCollection,
  DEFAULT_WORLD_REGION,
} from "./geojsonService";

// Projection definitions
const GOOGLE_PROJ =
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs";
const WGS84_PROJ = "+proj=longlat +datum=WGS84 +no_defs";

export interface MapGenerationParams {
  height?: number;
  width?: number;
  countries?: string[];
  region?: BoundingBox;
  grid?: GridType;
  spacing?: number;
  geojsonWorld?: FeatureCollection;
  geojsonByCountry?: Record<string, Feature>;
  detectCountries?: boolean;
  targetCountries?: string[];
}

/**
 * Generate a dotted map from GeoJSON data
 * Core algorithm that:
 * 1. Determines the geographic region to map
 * 2. Calculates projection bounds
 * 3. Generates a grid of points
 * 4. Filters points inside the polygon boundaries
 *
 * @param params - Map generation parameters
 * @returns MapConfig with generated points
 */
export function generateMap<TData = unknown>(
  params: MapGenerationParams
): MapConfig<TData> {
  const {
    height: inputHeight = 0,
    width: inputWidth = 0,
    countries = [],
    region: inputRegion,
    grid = "square",
    spacing = 2,
    geojsonWorld,
    geojsonByCountry,
    detectCountries = false,
    targetCountries = [],
  } = params;

  // Validate dimensions
  if (inputHeight <= 0 && inputWidth <= 0) {
    throw new Error("Either height or width must be greater than 0");
  }

  // Determine GeoJSON source
  let geojson: FeatureCollection;
  let region: BoundingBox;

  if (countries.length > 0) {
    // Generate map for specific countries
    if (!geojsonByCountry) {
      throw new Error(
        "geojsonByCountry is required when countries are specified"
      );
    }

    geojson = createCountriesFeatureCollection(countries, geojsonByCountry);

    // Auto-compute region from selected countries if not provided
    region = inputRegion ?? computeGeojsonBox(geojson);
  } else {
    // Use world map
    if (!geojsonWorld) {
      throw new Error("geojsonWorld is required when countries are not specified");
    }

    geojson = geojsonWorld;
    region = inputRegion ?? DEFAULT_WORLD_REGION;
  }

  // Convert to unified MultiPolygon for boundary testing
  const poly = geojsonToMultiPolygons(geojson);

  // Prepare country detection if enabled
  // Only detect countries specified in targetCountries to improve performance
  const countryFeatures = detectCountries && geojsonByCountry
    ? Object.entries(geojsonByCountry)
      .filter(([code]) => targetCountries.length === 0 || targetCountries.includes(code))
      .map(([code, feature]) => ({
        code,
        feature,
      }))
    : [];

  // Project region bounds to Google Mercator
  const [X_MIN, Y_MIN] = proj4(GOOGLE_PROJ, [region.lng.min, region.lat.min]);
  const [X_MAX, Y_MAX] = proj4(GOOGLE_PROJ, [region.lng.max, region.lat.max]);

  const X_RANGE = X_MAX - X_MIN;
  const Y_RANGE = Y_MAX - Y_MIN;

  // Calculate final dimensions maintaining aspect ratio
  let width = inputWidth;
  let height = inputHeight;

  if (width <= 0) {
    width = Math.round((height * X_RANGE) / Y_RANGE);
  } else if (height <= 0) {
    height = Math.round((width * Y_RANGE) / X_RANGE);
  }

  // Generate grid points with spacing control
  const points: Record<string, PinPoint<TData>> = {};
  // "vertical" is treated as "square" grid (ystep = 1)
  const ystep = grid === "diagonal" ? Math.sqrt(3) / 2 : 1;

  for (let y = 0; y * ystep < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      // Apply diagonal grid offset for even rows
      const localx = y % 2 === 0 && grid === "diagonal" ? x + 0.5 : x;
      const localy = y * ystep;

      // Convert screen coordinates to Google Mercator
      const pointGoogle: [number, number] = [
        (localx / width) * X_RANGE + X_MIN,
        Y_MAX - (localy / height) * Y_RANGE,
      ];

      // Convert to WGS84 for boundary testing
      const wgs84Point = proj4(GOOGLE_PROJ, WGS84_PROJ, pointGoogle);

      // Check if point is inside polygon boundaries
      if (inside(wgs84Point, poly)) {
        const [lng, lat] = wgs84Point;
        const key = [x, y].join(";");

        // Detect which country this point belongs to
        let countryCode: string | undefined;
        if (detectCountries && countryFeatures.length > 0) {
          for (const { code, feature } of countryFeatures) {
            // Type assertion: GeoJSON country features are always Polygon/MultiPolygon
            if (inside(wgs84Point, feature as any)) {
              countryCode = code;
              break;
            }
          }
        }

        points[key] = {
          x: localx,
          y: localy,
          lat,
          lng,
          countryCode,
        };
      }
    }
  }

  return {
    points,
    X_MIN,
    Y_MIN,
    X_MAX,
    Y_MAX,
    X_RANGE,
    Y_RANGE,
    region: JSON.stringify(region),
    grid,
    height,
    width,
    ystep,
  };
}

/**
 * Generate map and return as JSON string
 * Useful for caching and serialization
 * @param params - Map generation parameters
 * @returns JSON string representation of MapConfig
 */
export function generateMapJSON(params: MapGenerationParams): string {
  return JSON.stringify(generateMap(params));
}

/**
 * Create cache key for map generation
 * Used to avoid regenerating identical maps
 * @param params - Map generation parameters
 * @returns Cache key string
 */
export function createMapCacheKey(params: MapGenerationParams): string {
  const { height = 0, width = 0, countries = [], region, grid = "square" } = params;

  return [
    JSON.stringify(region),
    grid,
    height,
    width,
    JSON.stringify(countries),
  ].join(" ");
}
