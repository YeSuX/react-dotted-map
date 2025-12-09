import { useState } from "react";
import { DottedMap, type MapConfig } from "../components";

const initialMapConfig: MapConfig = {
  points: {},
  X_MIN: -20037508.34,
  Y_MAX: 20037508.34,
  X_RANGE: 40075016.68,
  Y_RANGE: 40075016.68,
  region: "world",
  grid: "square",
  width: 800,
  height: 400,
  ystep: 1,
};

export default function BasicExample() {
  const [mapConfig] = useState(initialMapConfig);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Basic Example - Simple Usage</h2>
      <p>Direct rendering with basic configuration</p>
      <DottedMap
        map={mapConfig}
        shape="circle"
        color="#3b82f6"
        backgroundColor="#f3f4f6"
        radius={1}
      />
    </div>
  );
}
