/**
 * UI Layer Barrel Export
 * Centralized exports for all UI components
 */

export { default as DottedMap } from "./DottedMap";
export { default as Pin } from "./Pin";

// Re-export commonly used types and hooks for convenience
export { useDottedMap } from "../hooks";
export type {
    MapConfig,
    PinPoint,
    SvgOptions,
    AddPinParams,
    GetSVGParams,
    DottedMapInstance,
    ShapeType,
    GridType,
    PolygonType,
} from "../services/types";

