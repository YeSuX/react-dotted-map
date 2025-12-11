/**
 * Hook Layer: useMapFactory
 * Manages map generation logic and memoization
 * Delegates business logic to Service layer (mapGenerator)
 */

import { useMemo } from "react";
import type { FeatureCollection, Feature } from "geojson";
import { generateMap } from "../services/mapGenerator";
import type { BoundingBox } from "../services/geojsonService";
import type { GridType, MapConfig } from "../services/types";

export interface UseMapFactoryParams {
  height?: number;
  width?: number;
  countries?: string[];
  region?: BoundingBox;
  grid?: GridType;
  spacing?: number;
  geojsonWorld?: FeatureCollection;
  geojsonByCountry?: Record<string, Feature>;
  countryColors?: Record<string, string>;
}

/**
 * Hook for generating MapConfig from GeoJSON data
 * Memoizes map generation to avoid expensive recalculation
 * 
 * @returns MapConfig object ready for use by DottedMap component
 */
export function useMapFactory({
  height,
  width,
  countries,
  region,
  grid = "vertical",
  spacing = 2,
  geojsonWorld,
  geojsonByCountry,
  countryColors,
}: UseMapFactoryParams): MapConfig {
  // Serialize all complex dependencies to prevent reference instability
  const countriesKey = countries ? JSON.stringify(countries) : "";
  const regionKey = region ? JSON.stringify(region) : "";
  const countryColorsKey = countryColors ? JSON.stringify(countryColors) : "";

  // Serialize GeoJSON data to stable keys
  // These are large objects that may have unstable references
  const geojsonWorldKey = geojsonWorld
    ? JSON.stringify(geojsonWorld.features.map(f => f.id)).slice(0, 100)
    : "";
  const geojsonByCountryKey = geojsonByCountry
    ? JSON.stringify(Object.keys(geojsonByCountry).sort()).slice(0, 100)
    : "";

  // Memoize map generation based on generation parameters
  const map = useMemo(() => {
    // Call Service layer to generate map
    // Enable country detection if countryColors is provided
    // Only detect countries in countryColors to improve performance
    const targetCountries = countryColors ? Object.keys(countryColors) : [];

    return generateMap({
      height,
      width,
      countries,
      region,
      grid,
      spacing,
      geojsonWorld,
      geojsonByCountry,
      detectCountries: !!countryColors,
      targetCountries,
    });
    // Use serialized keys instead of object references to prevent unnecessary recalculation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, countriesKey, regionKey, grid, spacing, geojsonWorldKey, geojsonByCountryKey, countryColorsKey]);

  return map;
}
