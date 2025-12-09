/**
 * UI Layer: DottedMapFactory Component
 * High-level component that generates MapConfig from GeoJSON data
 * Wraps the low-level DottedMap component with map generation logic
 */

import { useMemo } from "react";
import type { FeatureCollection, Feature } from "geojson";
import DottedMap, { type DottedMapProps } from "./DottedMap";
import { generateMap, createMapCacheKey } from "../services/mapGenerator";
import type { BoundingBox } from "../services/geojsonService";
import type { GridType } from "../services/types";

export interface DottedMapFactoryProps<TData = unknown>
  extends Omit<DottedMapProps<TData>, "map"> {
  height?: number;
  width?: number;
  countries?: string[];
  region?: BoundingBox;
  grid?: GridType;
  geojsonWorld?: FeatureCollection;
  geojsonByCountry?: Record<string, Feature>;
}

/**
 * Factory component that generates a dotted map from GeoJSON data
 * Automatically creates MapConfig based on provided parameters
 *
 * Usage:
 * ```tsx
 * <DottedMapFactory
 *   width={800}
 *   height={600}
 *   countries={["CHN", "USA"]}
 *   geojsonByCountry={geojsonData}
 * />
 * ```
 */
export default function DottedMapFactory<TData = unknown>({
  height,
  width,
  countries,
  region,
  grid = "vertical",
  geojsonWorld,
  geojsonByCountry,
  ...dottedMapProps
}: DottedMapFactoryProps<TData>) {
  // Memoize map generation to avoid expensive recalculation
  const map = useMemo(() => {
    const cacheKey = createMapCacheKey({
      height,
      width,
      countries,
      region,
      grid,
    });

    // In production, you could integrate with a caching mechanism here
    // For now, we generate on every mount
    return generateMap<TData>({
      height,
      width,
      countries,
      region,
      grid,
      geojsonWorld,
      geojsonByCountry,
    });
  }, [height, width, countries, region, grid, geojsonWorld, geojsonByCountry]);

  return <DottedMap<TData> map={map} {...dottedMapProps} />;
}
