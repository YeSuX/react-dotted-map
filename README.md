# React Dotted Map

[![npm version](https://img.shields.io/npm/v/@suxiong/react-dotted-map.svg)](https://www.npmjs.com/package/@suxiong/react-dotted-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy Status](https://github.com/YeSuX/react-dotted-map/actions/workflows/deploy.yml/badge.svg)](https://github.com/YeSuX/react-dotted-map/actions/workflows/deploy.yml)

一个高性能的 React 点阵地图渲染库，支持基于 GeoJSON 数据的交互式地图可视化。

**🎮 [在线演示 Playground](https://yesux.github.io/react-dotted-map/)**

## ✨ 特性

- 🗺️ **GeoJSON 原生支持** - 完全兼容标准 GeoJSON 格式
- 🎨 **混合渲染模式** - Canvas 渲染基础地图（高性能） + SVG 渲染交互元素（灵活性）
- 🌍 **内置世界地图数据** - 开箱即用的全球地图 GeoJSON 数据
- 🎯 **多种使用模式** - 组件、Hooks、Render Props 三种灵活方式
- 📍 **Pin 点管理** - 简单易用的地点标记系统，支持自定义样式和交互
- 🎪 **多种网格布局** - 支持 Square、Diagonal、Vertical 三种网格模式
- 🔷 **多种形状** - Circle 和 Hexagon 两种点阵形状
- 🎨 **按国家着色** - 支持为不同国家/区域设置不同颜色
- 🌐 **地图投影** - 基于 Proj4 的 Google Mercator 投影
- ⚡ **TypeScript** - 完整的类型定义和类型安全
- 🎭 **高度可定制** - 丰富的配置选项和样式定制能力

## 📦 安装

```bash
npm install @suxiong/react-dotted-map
```

或使用其他包管理器：

```bash
yarn add @suxiong/react-dotted-map
pnpm add @suxiong/react-dotted-map
bun add @suxiong/react-dotted-map
```

## 🚀 快速开始

### 1. 基础组件用法

最简单的使用方式，使用内置地图数据快速渲染：

```tsx
import { DottedMap } from "@suxiong/react-dotted-map";
import { geojsonWorld } from "@suxiong/react-dotted-map";
import { useMapFactory } from "@suxiong/react-dotted-map";

function App() {
  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 2,
    geojsonWorld,
  });

  return (
    <DottedMap
      map={map}
      shape="circle"
      color="#3b82f6"
      backgroundColor="#f3f4f6"
      radius={1}
    />
  );
}
```

### 2. Render Props 模式 - 添加自定义 Pin 点

使用 render props 获得完整控制权，添加交互式 Pin 点：

```tsx
import { DottedMap } from "@suxiong/react-dotted-map";
import { geojsonWorld } from "@suxiong/react-dotted-map";
import { useMapFactory } from "@suxiong/react-dotted-map";

function App() {
  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 2,
    geojsonWorld,
  });

  return (
    <DottedMap map={map}>
      {(instance) => {
        // 添加自定义 Pin 点
        instance.addPin({
          lat: 40.7128,
          lng: -74.006,
          data: { city: "New York" },
          svgOptions: { color: "#ef4444", radius: 2 },
        });

        instance.addPin({
          lat: 51.5074,
          lng: -0.1278,
          data: { city: "London" },
          svgOptions: { color: "#10b981", radius: 2 },
        });

        return (
          <div
            dangerouslySetInnerHTML={{
              __html: instance.getSVG({
                shape: "circle",
                backgroundColor: "#1f2937",
                color: "#9ca3af",
              }),
            }}
          />
        );
      }}
    </DottedMap>
  );
}
```

### 3. Hook 模式 - 完全自定义渲染

使用 Hook 获得最大灵活性，完全控制渲染过程：

```tsx
import { useDottedMap } from "@suxiong/react-dotted-map";
import { useMapFactory } from "@suxiong/react-dotted-map";
import { geojsonWorld } from "@suxiong/react-dotted-map";

function App() {
  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 2,
    geojsonWorld,
  });

  const instance = useDottedMap(map);

  // 添加 Pin 点
  instance.addPin({
    lat: 40.7128,
    lng: -74.006,
    data: { city: "New York" },
    svgOptions: { color: "#ef4444", radius: 3 },
  });

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: instance.getSVG({
          shape: "hexagon",
          color: "#60a5fa",
          radius: 1.5,
        }),
      }}
    />
  );
}
```

### 4. 按国家过滤和着色

渲染特定国家，并为不同国家设置不同颜色：

```tsx
import { DottedMap } from "@suxiong/react-dotted-map";
import { geojsonWorld, geojsonByCountry } from "@suxiong/react-dotted-map";
import { useMapFactory } from "@suxiong/react-dotted-map";

function App() {
  const countryColors = {
    USA: "#ef4444",
    CHN: "#3b82f6",
    JPN: "#10b981",
    GBR: "#f59e0b",
  };

  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 2,
    countries: ["USA", "CHN", "JPN", "GBR"],
    geojsonWorld,
    geojsonByCountry,
    countryColors,
  });

  return (
    <DottedMap
      map={map}
      shape="circle"
      backgroundColor="#f9fafb"
      radius={1}
      countryColors={countryColors}
    />
  );
}
```

## 📖 API 文档

### Components

#### `<DottedMap>`

主地图组件，支持两种渲染模式：

**自动渲染模式**（不使用 children）：

```tsx
<DottedMap
  map={mapConfig}
  shape="circle"
  color="#3b82f6"
  backgroundColor="#f3f4f6"
  radius={1}
  countryColors={{ USA: "#ef4444" }}
/>
```

**Render Props 模式**（使用 children 函数）：

```tsx
<DottedMap map={mapConfig}>
  {(instance) => {
    instance.addPin({ lat: 40, lng: -74 });
    return <div dangerouslySetInnerHTML={{ __html: instance.getSVG() }} />;
  }}
</DottedMap>
```

##### Props

| 属性              | 类型                     | 默认值           | 说明                                        |
| ----------------- | ------------------------ | ---------------- | ------------------------------------------- |
| `map`             | `MapConfig`              | **必需**         | 地图配置对象（由 `useMapFactory` 生成）     |
| `shape`           | `'circle' \| 'hexagon'`  | `'circle'`       | 点阵形状                                    |
| `color`           | `string`                 | `'currentColor'` | 点阵颜色                                    |
| `backgroundColor` | `string`                 | `'transparent'`  | 背景颜色                                    |
| `radius`          | `number`                 | `0.5`            | 点阵大小                                    |
| `countryColors`   | `Record<string, string>` | -                | 按国家代码设置颜色                          |
| `avoidOuterPins`  | `boolean`                | `false`          | 避免在边界外添加 Pin 点                     |
| `polygon`         | `PolygonType`            | -                | 自定义多边形边界                            |
| `children`        | `function`               | -                | Render props 函数，接收 `DottedMapInstance` |

#### `<Pin>`

单独的 Pin 点组件（用于 SVG 渲染）：

```tsx
<Pin
  x={100}
  y={200}
  shape="circle"
  radius={2}
  color="#ef4444"
  onClick={() => console.log("Clicked!")}
/>
```

##### Props

| 属性           | 类型                    | 默认值           | 说明         |
| -------------- | ----------------------- | ---------------- | ------------ |
| `x`            | `number`                | **必需**         | 屏幕 X 坐标  |
| `y`            | `number`                | **必需**         | 屏幕 Y 坐标  |
| `shape`        | `'circle' \| 'hexagon'` | `'circle'`       | 形状         |
| `radius`       | `number`                | `0.5`            | 大小         |
| `color`        | `string`                | `'currentColor'` | 颜色         |
| `svgOptions`   | `SvgOptions`            | -                | 覆盖样式选项 |
| `onClick`      | `function`              | -                | 点击事件处理 |
| `onMouseEnter` | `function`              | -                | 鼠标悬停事件 |
| `onMouseLeave` | `function`              | -                | 鼠标离开事件 |

### Hooks

#### `useMapFactory(params)`

生成地图配置对象的 Hook，处理 GeoJSON 数据并生成点阵地图。

```tsx
const map = useMapFactory({
  height: 400,
  width: 800,
  grid: "square",
  spacing: 2,
  geojsonWorld,
  countries: ["USA", "CHN"],
  geojsonByCountry,
  countryColors: { USA: "#ef4444" },
});
```

##### 参数

| 属性               | 类型                                   | 默认值       | 说明                               |
| ------------------ | -------------------------------------- | ------------ | ---------------------------------- |
| `height`           | `number`                               | -            | 地图高度（与 width 至少提供一个）  |
| `width`            | `number`                               | -            | 地图宽度（与 height 至少提供一个） |
| `grid`             | `'square' \| 'diagonal' \| 'vertical'` | `'vertical'` | 网格类型                           |
| `spacing`          | `number`                               | `2`          | 点阵间距                           |
| `countries`        | `string[]`                             | -            | 要显示的国家代码列表               |
| `region`           | `BoundingBox`                          | -            | 自定义地图区域边界                 |
| `geojsonWorld`     | `FeatureCollection`                    | -            | 世界地图 GeoJSON 数据              |
| `geojsonByCountry` | `Record<string, Feature>`              | -            | 按国家分组的 GeoJSON               |
| `countryColors`    | `Record<string, string>`               | -            | 国家颜色映射                       |

##### 返回值

`MapConfig` 对象，包含生成的地图点阵数据和配置。

#### `useDottedMap(map, avoidOuterPins?, polygon?)`

管理地图实例和 Pin 点的 Hook。

```tsx
const instance = useDottedMap(map);

instance.addPin({
  lat: 40.7128,
  lng: -74.006,
  data: { city: "New York" },
  svgOptions: { color: "#ef4444", radius: 2 },
});

const svg = instance.getSVG({ shape: "circle", color: "#3b82f6" });
```

##### 参数

| 参数             | 类型          | 默认值   | 说明                    |
| ---------------- | ------------- | -------- | ----------------------- |
| `map`            | `MapConfig`   | **必需** | 地图配置对象            |
| `avoidOuterPins` | `boolean`     | `false`  | 避免在边界外添加 Pin 点 |
| `polygon`        | `PolygonType` | -        | 自定义多边形边界        |

##### 返回值 - `DottedMapInstance`

| 方法                 | 类型                                                              | 说明                          |
| -------------------- | ----------------------------------------------------------------- | ----------------------------- |
| `addPin(params)`     | `(params: AddPinParams) => PinPoint \| undefined`                 | 添加 Pin 点                   |
| `getPin(params)`     | `(params: { lat: number; lng: number }) => PinPoint \| undefined` | 获取指定坐标的 Pin 点         |
| `getPoints()`        | `() => PinPoint[]`                                                | 获取所有点（基础 + 用户添加） |
| `getBasePoints()`    | `() => PinPoint[]`                                                | 获取基础地图点                |
| `getUserPins()`      | `() => PinPoint[]`                                                | 获取用户添加的 Pin 点         |
| `getSVG(params?)`    | `(params?: GetSVGParams) => string`                               | 生成 SVG 字符串               |
| `drawCanvas(params)` | `(params: DrawCanvasParams) => void`                              | 在 Canvas 上绘制地图          |
| `image`              | `{ region?: string; width: number; height: number }`              | 地图尺寸信息                  |

### 数据导出

库内置了世界地图 GeoJSON 数据：

```tsx
import {
  geojsonWorld, // 完整世界地图 FeatureCollection
  geojsonByCountry, // 按国家代码索引的 Feature 对象
  getAvailableCountries, // 获取所有可用国家代码
  getCountryFeature, // 根据代码获取国家 Feature
} from "@suxiong/react-dotted-map";

// 查看所有可用国家
const countries = getAvailableCountries();
console.log(countries); // ['USA', 'CHN', 'JPN', ...]

// 获取特定国家数据
const usaFeature = getCountryFeature("USA");
```

### Service 函数

库还导出了底层服务函数，供高级用户直接使用：

```tsx
import {
  generateMap, // 生成地图配置
  generateMapJSON, // 生成地图配置 JSON
  createMapCacheKey, // 创建地图缓存键
  drawMapOnCanvas, // Canvas 渲染
  drawPoint, // 绘制单个点
  generateMapSVG, // SVG 生成
  generatePinSVG, // Pin SVG 生成
  geojsonToMultiPolygons, // GeoJSON 转换
  computeGeojsonBox, // 计算 GeoJSON 边界框
  projectCoordinates, // 坐标投影
  isPointInPolygon, // 点是否在多边形内
  latLngToScreenCoords, // 经纬度转屏幕坐标
  screenCoordsToLatLng, // 屏幕坐标转经纬度
} from "@suxiong/react-dotted-map";
```

### TypeScript 类型

```tsx
import type {
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
  BoundingBox,
  MapGenerationParams,
} from "@suxiong/react-dotted-map";
```

## 🎨 使用场景

### 场景 1: 数据可视化

展示全球用户分布：

```tsx
function UserDistribution({ users }) {
  const map = useMapFactory({
    height: 500,
    width: 1000,
    grid: "square",
    spacing: 2,
    geojsonWorld,
  });

  return (
    <DottedMap map={map}>
      {(instance) => {
        users.forEach((user) => {
          instance.addPin({
            lat: user.latitude,
            lng: user.longitude,
            data: user,
            svgOptions: {
              color: user.isPremium ? "#f59e0b" : "#60a5fa",
              radius: 2,
            },
          });
        });

        return (
          <div
            dangerouslySetInnerHTML={{
              __html: instance.getSVG({
                backgroundColor: "#f9fafb",
                color: "#d1d5db",
              }),
            }}
          />
        );
      }}
    </DottedMap>
  );
}
```

### 场景 2: 交互式地图

带有悬停和点击交互：

```tsx
function InteractiveMap() {
  const [selectedCity, setSelectedCity] = useState(null);
  const map = useMapFactory({ height: 400, width: 800, geojsonWorld });

  const cities = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  ];

  return (
    <div>
      <DottedMap map={map}>
        {(instance) => {
          cities.forEach((city) => {
            instance.addPin({
              lat: city.lat,
              lng: city.lng,
              data: city,
              svgOptions: {
                color: selectedCity === city.name ? "#ef4444" : "#3b82f6",
                radius: selectedCity === city.name ? 3 : 2,
              },
            });
          });

          return (
            <div
              onClick={() => console.log("Map clicked")}
              dangerouslySetInnerHTML={{
                __html: instance.getSVG(),
              }}
            />
          );
        }}
      </DottedMap>
      {selectedCity && <div>Selected: {selectedCity}</div>}
    </div>
  );
}
```

### 场景 3: 区域对比

对比不同国家或区域：

```tsx
function RegionComparison() {
  const countryColors = {
    USA: "#ef4444",
    CHN: "#3b82f6",
    IND: "#10b981",
    BRA: "#f59e0b",
  };

  const map = useMapFactory({
    height: 400,
    width: 800,
    grid: "square",
    spacing: 2,
    countries: Object.keys(countryColors),
    geojsonWorld,
    geojsonByCountry,
    countryColors,
  });

  return (
    <div>
      <DottedMap
        map={map}
        shape="hexagon"
        radius={1.5}
        countryColors={countryColors}
      />
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        {Object.entries(countryColors).map(([country, color]) => (
          <div key={country} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: color,
                marginRight: 8,
              }}
            />
            <span>{country}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🏗️ 架构设计

本库采用分层架构设计，确保代码的可维护性和可测试性：

### 架构层次

```
┌─────────────────────────────────────┐
│         UI Layer (React)            │  ← Components (DottedMap, Pin)
├─────────────────────────────────────┤
│       Hook Layer (React)            │  ← Hooks (useDottedMap, useMapFactory)
├─────────────────────────────────────┤
│    Service Layer (Pure Logic)       │  ← Services (mapGenerator, canvas, svg)
├─────────────────────────────────────┤
│      Data Layer (GeoJSON)           │  ← countries.geo.json
└─────────────────────────────────────┘
```

- **UI Layer**: 纯展示组件，无业务逻辑
- **Hook Layer**: 状态管理和副作用处理
- **Service Layer**: 纯函数业务逻辑，可独立测试
- **Data Layer**: 静态 GeoJSON 数据

### 渲染策略

采用混合渲染策略，平衡性能和交互性：

- **Canvas 层**: 渲染基础地图点阵（数千个点，高性能）
- **SVG 层**: 渲染用户添加的 Pin 点（支持交互、样式定制）

## ⚙️ 高级用法

### 自定义 GeoJSON 数据

使用自己的 GeoJSON 数据：

```tsx
import customGeoJSON from "./my-regions.geo.json";

const map = useMapFactory({
  height: 400,
  width: 800,
  geojsonWorld: customGeoJSON,
});
```

### 自定义区域边界

限制地图到特定经纬度范围：

```tsx
const map = useMapFactory({
  height: 400,
  width: 800,
  region: {
    lat: { min: 20, max: 50 },
    lng: { min: -130, max: -60 },
  },
  geojsonWorld,
});
```

### 缓存地图配置

避免重复生成相同的地图：

```tsx
import { generateMapJSON, createMapCacheKey } from "@suxiong/react-dotted-map";

const params = { height: 400, width: 800, geojsonWorld };
const cacheKey = createMapCacheKey(params);

// 检查缓存
let mapJSON = localStorage.getItem(cacheKey);
if (!mapJSON) {
  mapJSON = generateMapJSON(params);
  localStorage.setItem(cacheKey, mapJSON);
}

const map = JSON.parse(mapJSON);
```

## 🔧 开发

```bash
# 安装依赖
npm install

# 开发模式（带示例）
npm run dev

# 构建库
npm run build

# 构建演示站点
npm run build:demo

# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

## 📄 许可证

MIT © [suxiong](https://github.com/YeSuX)

## 🤝 贡献

欢迎贡献！请随时提交 Issue 或 Pull Request。

## 🔗 相关链接

- [在线演示](https://yesux.github.io/react-dotted-map/)
- [GitHub 仓库](https://github.com/YeSuX/react-dotted-map)
- [NPM 包](https://www.npmjs.com/package/@suxiong/react-dotted-map)
- [问题反馈](https://github.com/YeSuX/react-dotted-map/issues)

## 📝 更新日志

### 1.0.0

- 🎉 首次发布
- ✨ 支持 Canvas 和 SVG 混合渲染
- ✨ 内置世界地图 GeoJSON 数据
- ✨ 多种使用模式（组件、Hooks、Render Props）
- ✨ 按国家过滤和着色
- ✨ 完整的 TypeScript 支持
