# React Dotted Map

A React library for rendering interactive dotted maps with GeoJSON support. Create beautiful, customizable maps with SVG or Canvas rendering.

## Features

- 🗺️ **GeoJSON Support**: Works with standard GeoJSON data
- 🎨 **Flexible Rendering**: SVG or Canvas rendering modes
- 🎯 **Multiple Map Projections**: Mercator, Equirectangular, and more
- 📍 **Interactive Pins**: Easy-to-use pin components with hover states
- 🎪 **Multiple Usage Patterns**: Components, Hooks, or Factory patterns
- ⚡ **TypeScript**: Full type safety included
- 🎭 **Customizable**: Extensive styling and configuration options

## Installation

```bash
npm install react-dotted-map
# or
yarn add react-dotted-map
# or
pnpm add react-dotted-map
# or
bun add react-dotted-map
```

## Quick Start

### Basic Component Usage

```tsx
import { DottedMap, Pin } from "react-dotted-map";
import { countriesGeoJSON } from "react-dotted-map";

function App() {
  return (
    <DottedMap
      geoJson={countriesGeoJSON}
      width={800}
      height={600}
      projection="mercator"
      renderMode="svg"
    >
      <Pin lat={40.7128} lng={-74.006} label="New York" />
      <Pin lat={51.5074} lng={-0.1278} label="London" />
    </DottedMap>
  );
}
```

### Hook Usage

```tsx
import { useDottedMap, Pin } from "react-dotted-map";
import { countriesGeoJSON } from "react-dotted-map";

function App() {
  const { mapRef, projectPoint } = useDottedMap({
    geoJson: countriesGeoJSON,
    width: 800,
    height: 600,
    projection: "mercator",
    renderMode: "svg",
  });

  return (
    <div>
      <div ref={mapRef} />
      <Pin
        lat={40.7128}
        lng={-74.006}
        label="New York"
        projectPoint={projectPoint}
      />
    </div>
  );
}
```

### Factory Pattern

```tsx
import { DottedMapFactory, Pin } from "react-dotted-map";
import { countriesGeoJSON } from "react-dotted-map";

function App() {
  return (
    <DottedMapFactory
      geoJson={countriesGeoJSON}
      width={800}
      height={600}
      projection="mercator"
      renderMode="svg"
    >
      {({ mapElement, projectPoint }) => (
        <div>
          {mapElement}
          <Pin
            lat={40.7128}
            lng={-74.006}
            label="New York"
            projectPoint={projectPoint}
          />
        </div>
      )}
    </DottedMapFactory>
  );
}
```

## API

### DottedMap Component

| Prop              | Type               | Default         | Description                 |
| ----------------- | ------------------ | --------------- | --------------------------- |
| `geoJson`         | `GeoJSONFeature[]` | required        | GeoJSON data to render      |
| `width`           | `number`           | required        | Map width in pixels         |
| `height`          | `number`           | required        | Map height in pixels        |
| `projection`      | `MapProjection`    | `'mercator'`    | Map projection type         |
| `renderMode`      | `RenderMode`       | `'svg'`         | Rendering mode (svg/canvas) |
| `dotSize`         | `number`           | `2`             | Size of map dots            |
| `dotSpacing`      | `number`           | `5`             | Spacing between dots        |
| `dotColor`        | `string`           | `'#000000'`     | Color of map dots           |
| `backgroundColor` | `string`           | `'transparent'` | Background color            |
| `regions`         | `MapRegion[]`      | `[]`            | Highlighted regions         |
| `className`       | `string`           | -               | CSS class name              |
| `style`           | `CSSProperties`    | -               | Inline styles               |

### Pin Component

| Prop           | Type       | Default     | Description               |
| -------------- | ---------- | ----------- | ------------------------- |
| `lat`          | `number`   | required    | Latitude                  |
| `lng`          | `number`   | required    | Longitude                 |
| `label`        | `string`   | -           | Pin label text            |
| `projectPoint` | `function` | -           | Point projection function |
| `color`        | `string`   | `'#ef4444'` | Pin color                 |
| `size`         | `number`   | `8`         | Pin size                  |
| `showLabel`    | `boolean`  | `true`      | Show/hide label           |
| `onClick`      | `function` | -           | Click handler             |
| `onHover`      | `function` | -           | Hover handler             |

## Projections

Supported projections:

- `mercator`: Standard web map projection
- `equirectangular`: Simple cylindrical projection
- `naturalEarth`: Compromise projection balancing size and shape

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
