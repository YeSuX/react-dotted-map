/**
 * GeoJSON data loader and utilities
 * Provides processed world map data for DottedMapFactory
 */

import type { Feature, FeatureCollection } from "geojson";
import geojsonWorldRaw from "./countries.geo.json";

// Type assertion for the imported JSON
export const geojsonWorld = geojsonWorldRaw as FeatureCollection;

/**
 * Build a map of country ID to GeoJSON feature
 * Enables quick lookup of country data by ISO code
 */
export const geojsonByCountry: Record<string, Feature> = geojsonWorld.features.reduce(
  (countries, feature) => {
    if (feature.id) {
      countries[String(feature.id)] = feature;
    }
    return countries;
  },
  {} as Record<string, Feature>
);

/**
 * Get list of all available country IDs
 */
export const getAvailableCountries = (): string[] => {
  return Object.keys(geojsonByCountry);
};

/**
 * Get country feature by ID
 */
export const getCountryFeature = (countryId: string): Feature | undefined => {
  return geojsonByCountry[countryId];
};
