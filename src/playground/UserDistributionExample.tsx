/**
 * Example: User Distribution Visualization
 * Demonstrates visualizing global user distribution with different user types
 */

import { useState } from "react";
import { DottedMapFactory } from "../components";
import { geojsonWorld } from "../data";

interface User {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isPremium: boolean;
}

export default function UserDistributionExample() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Alice",
      latitude: 40.7128,
      longitude: -74.006,
      isPremium: true,
    },
    {
      id: 2,
      name: "Bob",
      latitude: 51.5074,
      longitude: -0.1278,
      isPremium: false,
    },
    {
      id: 3,
      name: "Charlie",
      latitude: 35.6762,
      longitude: 139.6503,
      isPremium: true,
    },
    {
      id: 4,
      name: "Diana",
      latitude: 48.8566,
      longitude: 2.3522,
      isPremium: false,
    },
    {
      id: 5,
      name: "Eve",
      latitude: -33.8688,
      longitude: 151.2093,
      isPremium: true,
    },
    {
      id: 6,
      name: "Frank",
      latitude: 37.7749,
      longitude: -122.4194,
      isPremium: false,
    },
    {
      id: 7,
      name: "Grace",
      latitude: 39.9042,
      longitude: 116.4074,
      isPremium: true,
    },
    {
      id: 8,
      name: "Henry",
      latitude: 55.7558,
      longitude: 37.6173,
      isPremium: false,
    },
    {
      id: 9,
      name: "Ivy",
      latitude: 1.3521,
      longitude: 103.8198,
      isPremium: true,
    },
    {
      id: 10,
      name: "Jack",
      latitude: -23.5505,
      longitude: -46.6333,
      isPremium: false,
    },
  ]);

  const premiumUsers = users.filter((u) => u.isPremium).length;
  const freeUsers = users.length - premiumUsers;

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>User Distribution Visualization</h2>
      <p>
        Visualizing {users.length} users globally ({premiumUsers} premium,{" "}
        {freeUsers} free)
      </p>

      <DottedMapFactory
        height={500}
        width={1000}
        grid="square"
        spacing={5}
        geojsonWorld={geojsonWorld}
      >
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
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: instance.getSVG({
                    backgroundColor: "#f9fafb",
                    color: "#d1d5db",
                    shape: "circle",
                    radius: 0.5,
                  }),
                }}
              />
            </div>
          );
        }}
      </DottedMapFactory>

      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "16px",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#f59e0b",
              marginRight: 8,
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: "14px" }}>
            Premium Users ({premiumUsers})
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#60a5fa",
              marginRight: 8,
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: "14px" }}>Free Users ({freeUsers})</span>
        </div>
      </div>
    </div>
  );
}
