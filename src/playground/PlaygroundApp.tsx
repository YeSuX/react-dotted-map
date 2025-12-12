/**
 * Playground App - Comprehensive Showcase
 * Demonstrates all features and use cases from README
 */

import { useState } from "react";
import BasicExample from "./BasicExample";
import RenderPropsExample from "./RenderPropsExample";
import HookExample from "./HookExample";
import CountryFilterExample from "./CountryFilterExample";
import UserDistributionExample from "./UserDistributionExample";
import InteractiveMapExample from "./InteractiveMapExample";
import RegionComparisonExample from "./RegionComparisonExample";
import GridShapeExample from "./GridShapeExample";
import CustomRegionExample from "./CustomRegionExample";

type ExampleKey =
  | "basic"
  | "renderProps"
  | "hook"
  | "countryFilter"
  | "userDistribution"
  | "interactive"
  | "regionComparison"
  | "gridShape"
  | "customRegion"
  | "all";

interface ExampleConfig {
  key: ExampleKey;
  label: string;
  component: React.ComponentType;
  category: "Quick Start" | "Use Cases" | "Advanced";
}

export default function PlaygroundApp() {
  const [activeExample, setActiveExample] = useState<ExampleKey>("all");

  const examples: ExampleConfig[] = [
    {
      key: "basic",
      label: "Basic Usage",
      component: BasicExample,
      category: "Quick Start",
    },
    {
      key: "renderProps",
      label: "Render Props",
      component: RenderPropsExample,
      category: "Quick Start",
    },
    {
      key: "hook",
      label: "Hook API",
      component: HookExample,
      category: "Quick Start",
    },
    {
      key: "countryFilter",
      label: "Country Filtering",
      component: CountryFilterExample,
      category: "Use Cases",
    },
    {
      key: "userDistribution",
      label: "User Distribution",
      component: UserDistributionExample,
      category: "Use Cases",
    },
    {
      key: "interactive",
      label: "Interactive Map",
      component: InteractiveMapExample,
      category: "Use Cases",
    },
    {
      key: "regionComparison",
      label: "Region Comparison",
      component: RegionComparisonExample,
      category: "Use Cases",
    },
    {
      key: "gridShape",
      label: "Grid & Shapes",
      component: GridShapeExample,
      category: "Advanced",
    },
    {
      key: "customRegion",
      label: "Custom Regions",
      component: CustomRegionExample,
      category: "Advanced",
    },
  ];

  const categories = ["Quick Start", "Use Cases", "Advanced"] as const;

  const visibleExamples =
    activeExample === "all"
      ? examples
      : examples.filter((ex) => ex.key === activeExample);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "12px",
            }}
          >
            React Dotted Map Playground
          </h1>
          <p
            style={{ fontSize: "18px", color: "#64748b", marginBottom: "24px" }}
          >
            Interactive examples showcasing all features from the README
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: "12px",
              padding: "4px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <button
              onClick={() => setActiveExample("all")}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  activeExample === "all" ? "#3b82f6" : "transparent",
                color: activeExample === "all" ? "#ffffff" : "#64748b",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
            >
              Show All
            </button>
          </div>
        </header>

        {/* Navigation by Category */}
        <nav style={{ marginBottom: "40px" }}>
          {categories.map((category) => {
            const categoryExamples = examples.filter(
              (ex) => ex.category === category
            );

            return (
              <div key={category} style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "12px",
                  }}
                >
                  {category}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {categoryExamples.map((example) => (
                    <button
                      key={example.key}
                      onClick={() => setActiveExample(example.key)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor:
                          activeExample === example.key ? "#3b82f6" : "#ffffff",
                        color:
                          activeExample === example.key ? "#ffffff" : "#475569",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s",
                      }}
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Examples */}
        <main
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "40px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {visibleExamples.map((example) => {
            const Component = example.component;
            return <Component key={example.key} />;
          })}
        </main>

        {/* Footer */}
        <footer
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "14px",
            color: "#94a3b8",
          }}
        >
          <p>
            Built with React Dotted Map |{" "}
            <a
              href="https://github.com/YeSuX/react-dotted-map"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://www.npmjs.com/package/@suxiong/react-dotted-map"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              NPM
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}


