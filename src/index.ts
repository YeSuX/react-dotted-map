// Components
export { default as DottedMap } from './components/DottedMap';
export { default as DottedMapFactory } from './components/DottedMapFactory';
export { default as Pin } from './components/Pin';

// Hooks
export { useDottedMap } from './hooks/useDottedMap';
export { useMapFactory } from './hooks/useMapFactory';

// Service Functions
export { generateMap, generateMapJSON, createMapCacheKey } from './services/mapGenerator';
export { drawMapOnCanvas, drawPoint } from './services/canvasService';
export { generateMapSVG, generatePinSVG } from './services/svgService';
export {
  geojsonToMultiPolygons,
  computeGeojsonBox,
  createCountriesFeatureCollection,
  DEFAULT_WORLD_REGION,
} from './services/geojsonService';
export { projectCoordinates, isPointInPolygon, latLngToScreenCoords, screenCoordsToLatLng } from './services/mapService';

// Types
export type {
  MapConfig,
  PinPoint,
  GridType,
  ShapeType,
  SvgOptions,
  AddPinParams,
  GetSVGParams,
  DrawCanvasParams,
  DottedMapInstance,
  PolygonType,
  ScreenCoords,
} from './services/types';
export type { BoundingBox } from './services/geojsonService';
export type { MapGenerationParams } from './services/mapGenerator';

// Data
export { geojsonWorld, geojsonByCountry, getAvailableCountries, getCountryFeature } from './data/index';

