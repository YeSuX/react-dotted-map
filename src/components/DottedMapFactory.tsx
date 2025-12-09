/**
 * UI Layer: DottedMapFactory Component
 * High-level component that generates MapConfig from GeoJSON data
 * Wraps the low-level DottedMap component with map generation logic
 */

import type { FeatureCollection, Feature } from "geojson";
import DottedMap, { type DottedMapProps } from "./DottedMap";
import { useMapFactory } from "../hooks/useMapFactory";
import type { BoundingBox } from "../services/geojsonService";
import type { GridType } from "../services/types";

export interface DottedMapFactoryProps<TData = unknown>
  extends Omit<DottedMapProps<TData>, "map"> {
  height?: number;
  width?: number;
  countries?: string[];
  region?: BoundingBox;
  grid?: GridType;
  spacing?: number;
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
  spacing = 2,
  geojsonWorld,
  geojsonByCountry,
  ...dottedMapProps
}: DottedMapFactoryProps<TData>) {
  // Delegate map generation logic to Hook layer
  const map = useMapFactory<TData>({
    height,
    width,
    countries,
    region,
    grid,
    spacing,
    geojsonWorld,
    geojsonByCountry,
  });

  return <DottedMap<TData> map={map} {...dottedMapProps} />;
}
