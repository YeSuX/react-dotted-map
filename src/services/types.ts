/**
 * Core type definitions for the dotted map system
 * Shared across Service, Hook, and UI layers
 */

import type { Feature, Polygon as GeoJSONPolygon } from "geojson";

export type GridType = "diagonal" | "square" | "vertical";
export type ShapeType = "circle" | "hexagon";

export interface SvgOptions {
  color?: string;
  radius?: number;
}

export interface PinPoint<TData = unknown> {
  x: number;
  y: number;
  lat: number;
  lng: number;
  data?: TData;
  svgOptions?: SvgOptions;
  countryCode?: string;
}

export interface MapConfig<TData = unknown> {
  points: Record<string, PinPoint<TData>>;
  X_MIN: number;
  Y_MAX: number;
  X_RANGE: number;
  Y_RANGE: number;
  region?: string;
  grid: GridType;
  width: number;
  height: number;
  ystep: number;
}

export interface AddPinParams<TData = unknown> {
  lat: number;
  lng: number;
  data?: TData;
  svgOptions?: SvgOptions;
}

export interface GetSVGParams {
  shape?: ShapeType;
  color?: string;
  backgroundColor?: string;
  radius?: number;
  countryColors?: Record<string, string>;
}

export interface DottedMapInstance<TData = unknown> {
  addPin: (params: AddPinParams<TData>) => PinPoint<TData> | undefined;
  getPin: (params: { lat: number; lng: number }) => PinPoint<TData> | undefined;
  getPoints: () => PinPoint<TData>[];
  getSVG: (params?: GetSVGParams) => string;
  image: {
    region?: string;
    width: number;
    height: number;
  };
}

export type PolygonType = Feature<GeoJSONPolygon> | GeoJSONPolygon;

// Internal service types
export interface LatLngToScreenParams {
  lat: number;
  lng: number;
  mapConfig: MapConfig;
  avoidOuterPins?: boolean;
  polygon?: PolygonType;
}

export interface ScreenCoords {
  x: number;
  y: number;
  lat: number;
  lng: number;
}

export interface ScreenCoordsToLatLngParams {
  x: number;
  y: number;
  mapConfig: MapConfig;
}

