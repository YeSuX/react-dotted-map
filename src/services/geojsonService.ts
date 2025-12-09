/**
 * GeoJSON Service Layer
 * Pure functions for processing GeoJSON data
 * Handles polygon operations, boundary calculations, and coordinate transformations
 */

import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from "geojson";

export interface BoundingBox {
  lat: { min: number; max: number };
  lng: { min: number; max: number };
}

export const DEFAULT_WORLD_REGION: BoundingBox = {
  lat: { min: -56, max: 71 },
  lng: { min: -179, max: 179 },
};

/**
 * Convert GeoJSON features to a unified MultiPolygon structure
 * Handles both Polygon and MultiPolygon geometries
 * @param geojson - GeoJSON FeatureCollection
 * @returns Feature with MultiPolygon geometry
 */
export function geojsonToMultiPolygons(
  geojson: FeatureCollection
): Feature<MultiPolygon> {
  const coordinates = geojson.features.reduce<number[][][][]>((poly, feature) => {
    if (!feature.geometry) return poly;

    if (feature.geometry.type === "Polygon") {
      return poly.concat([feature.geometry.coordinates]);
    } else if (feature.geometry.type === "MultiPolygon") {
      return poly.concat(feature.geometry.coordinates);
    }
    return poly;
  }, []);

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "MultiPolygon",
      coordinates,
    },
  };
}

/**
 * Compute bounding box from GeoJSON data
 * Recursively handles FeatureCollection, Feature, MultiPolygon, and Polygon types
 * @param geojson - GeoJSON object
 * @returns Bounding box with min/max lat/lng
 */
export function computeGeojsonBox(
  geojson: FeatureCollection | Feature | Geometry
): BoundingBox {
  // Handle FeatureCollection
  if ("type" in geojson && geojson.type === "FeatureCollection") {
    const boxes = (geojson as FeatureCollection).features.map((f) =>
      computeGeojsonBox(f)
    );
    return {
      lat: {
        min: Math.min(...boxes.map((box) => box.lat.min)),
        max: Math.max(...boxes.map((box) => box.lat.max)),
      },
      lng: {
        min: Math.min(...boxes.map((box) => box.lng.min)),
        max: Math.max(...boxes.map((box) => box.lng.max)),
      },
    };
  }

  // Handle Feature
  if ("type" in geojson && geojson.type === "Feature") {
    const feature = geojson as Feature;
    if (!feature.geometry) {
      throw new Error("Feature has no geometry");
    }
    return computeGeojsonBox(feature.geometry);
  }

  // Handle Geometry types
  const geometry = geojson as Geometry;

  if (geometry.type === "MultiPolygon") {
    // Flatten MultiPolygon to Polygon
    return computeGeojsonBox({
      type: "Polygon",
      coordinates: (geometry as MultiPolygon).coordinates.flat(),
    } as Polygon);
  }

  if (geometry.type === "Polygon") {
    const coords = (geometry as Polygon).coordinates.flat();
    const latitudes = coords.map(([_lng, lat]) => lat);
    const longitudes = coords.map(([lng, _lat]) => lng);

    return {
      lat: {
        min: Math.min(...latitudes),
        max: Math.max(...latitudes),
      },
      lng: {
        min: Math.min(...longitudes),
        max: Math.max(...longitudes),
      },
    };
  }

  throw new Error(`Unsupported geometry type: ${geometry.type}`);
}

/**
 * Create a GeoJSON FeatureCollection from country IDs
 * @param countryIds - Array of ISO country codes
 * @param geojsonByCountry - Map of country ID to GeoJSON feature
 * @returns FeatureCollection containing specified countries
 */
export function createCountriesFeatureCollection(
  countryIds: string[],
  geojsonByCountry: Record<string, Feature>
): FeatureCollection {
  const features = countryIds
    .map((id) => geojsonByCountry[id])
    .filter((feature): feature is Feature => feature !== undefined);

  return {
    type: "FeatureCollection",
    features,
  };
}
