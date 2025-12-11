import { DottedMap } from "../components";
import { geojsonWorld } from "../data";
import { useMapFactory } from "../hooks";

export default function BasicExample() {
  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 5,
    geojsonWorld,
  });

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Basic Example - Simple Usage</h2>
      <p>The simplest way to render a dotted map with default settings</p>
      <DottedMap
        map={map}
        shape="circle"
        color="#3b82f6"
        backgroundColor="#f3f4f6"
        radius={1}
      />
    </div>
  );
}
