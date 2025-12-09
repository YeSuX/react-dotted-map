import { useMemo } from "react";
import proj4 from "proj4";
import inside from "@turf/boolean-point-in-polygon";
import type { Feature, Polygon as GeoJSONPolygon } from "geojson";

// Type definitions
export interface MapConfig<TData = unknown> {
  points: Record<string, PinPoint<TData>>;
  X_MIN: number;
  Y_MAX: number;
  X_RANGE: number;
  Y_RANGE: number;
  region?: string;
  grid: "diagonal" | "square";
  width: number;
  height: number;
  ystep: number;
}

export interface PinPoint<TData = unknown> {
  x: number;
  y: number;
  lat: number;
  lng: number;
  data?: TData;
  svgOptions?: SvgOptions;
}

export interface SvgOptions {
  color?: string;
  radius?: number;
}

export interface AddPinParams<TData = unknown> {
  lat: number;
  lng: number;
  data?: TData;
  svgOptions?: SvgOptions;
}

export interface GetSVGParams {
  shape?: "circle" | "hexagon";
  color?: string;
  backgroundColor?: string;
  radius?: number;
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

export interface DottedMapProps<TData = unknown> {
  map: MapConfig<TData>;
  avoidOuterPins?: boolean;
  polygon?: Feature<GeoJSONPolygon> | GeoJSONPolygon;
  children?: (instance: DottedMapInstance<TData>) => React.ReactNode;
  shape?: "circle" | "hexagon";
  color?: string;
  backgroundColor?: string;
  radius?: number;
}

// Proj4 projection strings
const GOOGLE_PROJ =
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs";
const WGS84_PROJ = "+proj=longlat +datum=WGS84 +no_defs";

export function useDottedMap<TData = unknown>(
  map: MapConfig<TData>,
  avoidOuterPins = false,
  polygon?: Feature<GeoJSONPolygon> | GeoJSONPolygon
): DottedMapInstance<TData> {
  const instance = useMemo(() => {
    const {
      points,
      X_MIN,
      Y_MAX,
      X_RANGE,
      Y_RANGE,
      region,
      grid,
      width,
      height,
      ystep,
    } = map;

    // Create a copy of points to avoid mutating the original
    const pointsMap: Record<string, PinPoint<TData>> = { ...points };

    const addPin = ({
      lat,
      lng,
      data,
      svgOptions,
    }: AddPinParams<TData>): PinPoint<TData> | undefined => {
      const pin = getPin({ lat, lng });
      if (!pin) return undefined;

      const point: PinPoint<TData> = { ...pin, data, svgOptions };
      pointsMap[[point.x, point.y].join(";")] = point;
      return point;
    };

    const getPin = ({
      lat,
      lng,
    }: {
      lat: number;
      lng: number;
    }): PinPoint<TData> | undefined => {
      const [googleX, googleY] = proj4(GOOGLE_PROJ, [lng, lat]);

      if (avoidOuterPins && polygon) {
        const wgs84Point = proj4(GOOGLE_PROJ, WGS84_PROJ, [googleX, googleY]);
        if (!inside(wgs84Point, polygon)) return undefined;
      }

      let rawX = (width * (googleX - X_MIN)) / X_RANGE;
      const rawY = (height * (Y_MAX - googleY)) / Y_RANGE;

      const y = Math.round(rawY / ystep);
      if (y % 2 === 0 && grid === "diagonal") {
        rawX -= 0.5;
      }

      const x = Math.round(rawX);
      let localx = x;
      const localy = Math.round(y) * ystep;

      if (y % 2 === 0 && grid === "diagonal") {
        localx += 0.5;
      }

      const [localLng, localLat] = proj4(GOOGLE_PROJ, WGS84_PROJ, [
        (localx * X_RANGE) / width + X_MIN,
        Y_MAX - (localy * Y_RANGE) / height,
      ]);

      return { x: localx, y: localy, lat: localLat, lng: localLng };
    };

    const getPoints = (): PinPoint<TData>[] => {
      return Object.values(pointsMap);
    };

    const getSVG = ({
      shape = "circle",
      color = "current",
      backgroundColor = "transparent",
      radius = 0.5,
    }: GetSVGParams = {}): string => {
      const getPoint = ({ x, y, svgOptions = {} }: PinPoint<TData>): string => {
        const pointRadius = svgOptions.radius || radius;

        if (shape === "circle") {
          return `<circle cx="${x}" cy="${y}" r="${pointRadius}" fill="${
            svgOptions.color || color
          }" />`;
        } else if (shape === "hexagon") {
          const sqrt3radius = Math.sqrt(3) * pointRadius;
          const polyPoints = [
            [x + sqrt3radius, y - pointRadius],
            [x + sqrt3radius, y + pointRadius],
            [x, y + 2 * pointRadius],
            [x - sqrt3radius, y + pointRadius],
            [x - sqrt3radius, y - pointRadius],
            [x, y - 2 * pointRadius],
          ];
          return `<polyline points="${polyPoints
            .map((point) => point.join(","))
            .join(" ")}" fill="${svgOptions.color || color}" />`;
        }
        return "";
      };

      return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor}">
        ${Object.values(pointsMap).map(getPoint).join("\n")}
      </svg>`;
    };

    return {
      addPin,
      getPin,
      getPoints,
      getSVG,
      image: {
        region,
        width,
        height,
      },
    };
  }, [map, avoidOuterPins, polygon]);

  return instance;
}

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
  const instance = useDottedMap<TData>(map, avoidOuterPins, polygon);

  if (children) {
    return <>{children(instance)}</>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: instance.getSVG({ shape, color, backgroundColor, radius }),
      }}
    />
  );
}

export default DottedMap;
