"use client";

import { useEffect, useState } from "react";

export default function Overlay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  async function load() {
    if (!slug) return;

    const res = await fetch(`/api/settings/${slug}`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, [slug]);

  if (!data) return null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          color: data.color,
          fontFamily: data.font,
          fontSize: "90px",
          fontWeight: "bold",
          textShadow: "0 0 20px black",
          textAlign: "center",
        }}
      >
        WINS :{" "}
        <span style={{ color: data.wins < 0 ? "red" : data.color }}>
          {data.wins}
        </span>

        {data.multiplier >= 2 && <div>x{data.multiplier}</div>}
      </div>
    </div>
  );
}