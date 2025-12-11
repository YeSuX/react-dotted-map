# React Dotted Map - Playground Examples

This directory contains comprehensive examples demonstrating all features of the React Dotted Map library.

## 📁 Structure

### Quick Start Examples

- **BasicExample.tsx** - Simple usage with basic configuration
- **RenderPropsExample.tsx** - Using render props pattern to add custom pins
- **HookExample.tsx** - Using hooks for interactive pin management

### Use Case Examples

- **CountryFilterExample.tsx** - Filtering and coloring specific countries
- **UserDistributionExample.tsx** - Visualizing global user distribution
- **InteractiveMapExample.tsx** - Interactive map with hover and click events
- **RegionComparisonExample.tsx** - Comparing different regions with custom colors

### Advanced Examples

- **GridShapeExample.tsx** - Comparing different grid types and shapes
- **CustomRegionExample.tsx** - Limiting map to custom geographic boundaries
- **FactoryExample.tsx** - Comprehensive factory pattern examples

### Main App

- **PlaygroundApp.tsx** - Main playground application with navigation

## 🚀 Usage

Import and use any example in your application:

```tsx
import { BasicExample } from "./playground";

function App() {
  return <BasicExample />;
}
```

Or use the comprehensive playground app:

```tsx
import { PlaygroundApp } from "./playground";

function App() {
  return <PlaygroundApp />;
}
```

## 📖 Learning Path

1. Start with **BasicExample** to understand the basic component usage
2. Explore **RenderPropsExample** to learn how to add custom pins
3. Try **HookExample** for programmatic control
4. Study use case examples to see real-world applications
5. Dive into advanced examples for specialized features

## 🎨 Features Demonstrated

- ✅ Basic map rendering
- ✅ Custom pin placement
- ✅ Interactive features (hover, click)
- ✅ Country filtering and coloring
- ✅ Custom regions and boundaries
- ✅ Different grid layouts (square, diagonal, vertical)
- ✅ Different shapes (circle, hexagon)
- ✅ Data visualization patterns
- ✅ State management with React hooks
- ✅ Canvas and SVG rendering modes

## 🔧 Development

Run the playground in development mode:

```bash
npm run dev
```

The playground will be available at `http://localhost:5173`
