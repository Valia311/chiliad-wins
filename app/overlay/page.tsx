"use client";

import { useEffect, useState } from "react";

export default function Overlay() {

  const [data, setData] = useState<any>(null);

  async function load() {

    const res = await fetch("/api/settings");

    const json = await res.json();

    setData(json);

  }

  useEffect(() => {

    load();

    const interval = setInterval(load, 1000);

    return () => clearInterval(interval);

  }, []);

  if (!data) return null;

  return (

    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent"
      }}
    >

      <div
        style={{
          color: data.color,
          fontFamily: data.font,
          fontSize: "90px",
          fontWeight: "bold",
          textShadow: "0 0 20px black",
          textAlign: "center"
        }}
      >
        WINS :{" "}
        <span
          style={{
            color: data.wins < 0 ? "red" : data.color
          }}
        >
          {data.wins}
        </span>

        {data.multiplier >= 2 && (
          <div>
            x{data.multiplier}
          </div>
        )}

      </div>

    </div>

  );

}