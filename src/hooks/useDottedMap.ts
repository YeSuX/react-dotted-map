/**
 * Hook Layer: useDottedMap
 * Manages map state and orchestrates Service layer calls
 * Returns a stable API for UI components to interact with the map
 */

import { useRef, useMemo, useCallback } from "react";
import { latLngToScreenCoords } from "../services/mapService";
import { generateMapSVG } from "../services/svgService";
import { drawMapOnCanvas } from "../services/canvasService";
import type {
  MapConfig,
  DottedMapInstance,
  AddPinParams,
  PinPoint,
  GetSVGParams,
  DrawCanvasParams,
  PolygonType,
} from "../services/types";

/**
 * Custom hook for dotted map functionality
 * Provides methods to add pins, get pins, and generate SVG
 *
 * @param map - Map configuration including dimensions and grid settings
 * @param avoidOuterPins - Whether to filter pins outside polygon boundary
 * @param polygon - Optional polygon boundary for filtering pins
 * @returns DottedMapInstance with map manipulation methods
 */
export function useDottedMap<TData = unknown>(
  map: MapConfig<TData>,
  avoidOuterPins = false,
  polygon?: PolygonType
): DottedMapInstance<TData> {
  // Store map config in ref to maintain stable reference across renders
  // This prevents unnecessary recreation of callbacks
  const mapRef = useRef<MapConfig<TData>>(map);
  mapRef.current = map;

  // Store base points (from map.points) - rendered on Canvas
  const basePointsRef = useRef<Record<string, PinPoint<TData>>>({
    ...map.points,
  });

  // Store user-added pins - rendered as SVG for interactivity
  const userPinsRef = useRef<Record<string, PinPoint<TData>>>({});

  /**
   * Add a pin to the map at given lat/lng coordinates
   * Snaps to nearest grid point based on map configuration
   * User pins are rendered as SVG for interactivity
   */
  const addPin = useCallback(
    ({
      lat,
      lng,
      data,
      svgOptions,
    }: AddPinParams<TData>): PinPoint<TData> | undefined => {
      // Call Service layer to calculate screen coordinates
      const screenCoords = latLngToScreenCoords({
        lat,
        lng,
        mapConfig: mapRef.current,
        avoidOuterPins,
        polygon,
      });

      if (!screenCoords) return undefined;

      // Create pin point with user data and styling
      const point: PinPoint<TData> = {
        ...screenCoords,
        data,
        svgOptions,
      };

      // Store in user pins map using x;y as key
      const key = [point.x, point.y].join(";");
      userPinsRef.current[key] = point;

      return point;
    },
    [avoidOuterPins, polygon]
  );

  /**
   * Get screen coordinates for a lat/lng position
   * Does not add the pin to the map
   */
  const getPin = useCallback(
    ({
      lat,
      lng,
    }: {
      lat: number;
      lng: number;
    }): PinPoint<TData> | undefined => {
      return latLngToScreenCoords({
        lat,
        lng,
        mapConfig: mapRef.current,
        avoidOuterPins,
        polygon,
      });
    },
    [avoidOuterPins, polygon]
  );

  /**
   * Get all points (base + user pins)
   */
  const getPoints = useCallback((): PinPoint<TData>[] => {
    return [
      ...Object.values(basePointsRef.current),
      ...Object.values(userPinsRef.current),
    ];
  }, []);

  /**
   * Get base map points (rendered on Canvas)
   */
  const getBasePoints = useCallback((): PinPoint<TData>[] => {
    return Object.values(basePointsRef.current);
  }, []);

  /**
   * Get user-added pins (rendered as SVG for interactivity)
   */
  const getUserPins = useCallback((): PinPoint<TData>[] => {
    return Object.values(userPinsRef.current);
  }, []);

  /**
   * Generate SVG string for the current map state
   * Called on-demand when rendering is needed
   */
  const getSVG = useCallback((params: GetSVGParams = {}): string => {
    const points = [
      ...Object.values(basePointsRef.current),
      ...Object.values(userPinsRef.current),
    ];
    return generateMapSVG(points, params, mapRef.current.width, mapRef.current.height);
  }, []);

  /**
   * Draw base map points on canvas for high performance
   */
  const drawCanvas = useCallback((params: DrawCanvasParams): void => {
    const {
      canvas,
      shape = "circle",
      color = "current",
      backgroundColor = "transparent",
      radius = 0.5,
      countryColors,
    } = params;

    const basePoints = Object.values(basePointsRef.current);
    drawMapOnCanvas(
      canvas,
      basePoints,
      shape,
      color,
      backgroundColor,
      radius,
      countryColors
    );
  }, []);

  // Memoize the instance object to maintain referential stability
  const instance = useMemo<DottedMapInstance<TData>>(
    () => ({
      addPin,
      getPin,
      getPoints,
      getBasePoints,
      getUserPins,
      getSVG,
      drawCanvas,
      image: {
        region: mapRef.current.region,
        width: mapRef.current.width,
        height: mapRef.current.height,
      },
    }),
    [addPin, getPin, getPoints, getBasePoints, getUserPins, getSVG, drawCanvas]
  );

  return instance;
}

