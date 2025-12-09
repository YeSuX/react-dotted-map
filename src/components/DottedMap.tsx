/**
 * UI Layer: DottedMap Component
 * Pure presentational component - no business logic
 * Delegates all logic to useDottedMap hook
 */

import { useDottedMap } from "../hooks/useDottedMap";
import type { MapConfig, PolygonType, ShapeType } from "../services/types";

export interface DottedMapProps<TData = unknown> {
  map: MapConfig<TData>;
  avoidOuterPins?: boolean;
  polygon?: PolygonType;
  children?: (
    instance: ReturnType<typeof useDottedMap<TData>>
  ) => React.ReactNode;
  shape?: ShapeType;
  color?: string;
  backgroundColor?: string;
  radius?: number;
}

/**
 * DottedMap component with two rendering modes:
 * 1. Render props: Pass children function to get full control via instance
 * 2. Auto-render: Automatically renders SVG with provided styling props
 */
function DottedMap<TData = unknown>({
  map,
  avoidOuterPins = false,
  polygon,
  children,
  shape = "circle",
  color = "current",
  backgroundColor = "transparent",
  radius = 0.5,
}: DottedMapProps<TData>) {
  // Delegate all logic to Hook layer
  const instance = useDottedMap<TData>(map, avoidOuterPins, polygon);

  // Render props mode: Give full control to parent
  if (children) {
    return <>{children(instance)}</>;
  }

  // Auto-render mode: Generate and render SVG with provided styling
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: instance.getSVG({ shape, color, backgroundColor, radius }),
      }}
    />
  );
}

export default DottedMap;
