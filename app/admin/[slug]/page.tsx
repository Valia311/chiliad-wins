"use client";

import { useEffect, useState } from "react";

export default function AdminPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const [settings, setSettings] = useState({
    wins: 0,
    multiplier: 1,
    color: "#ffffff",
    font: "Arial",
  });

  async function fetchSettings() {
    const res = await fetch(`/api/settings/${slug}`);
    const data = await res.json();

    setSettings(data);
  }

  useEffect(() => {
    fetchSettings();

    const interval = setInterval(fetchSettings, 1000);

    return () => clearInterval(interval);
  }, []);

  async function action(type: string, amount = 1) {
    await fetch(`/api/hook/${slug}/${type}/${amount}`, {
      method: "POST",
    });

    fetchSettings();
  }

  return (
    <main
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        padding: 40,
        fontFamily: "Arial",
      }}
    >
      <h1>CHILIAD ADMIN PANEL</h1>

      <h2>Utilisateur : {slug}</h2>

      <h1
        style={{
          fontSize: 80,
          color:
            settings.wins < 0
              ? "red"
              : "white",
        }}
      >
        WINS : {settings.wins}
      </h1>

      <h2>
        MULTI x{settings.multiplier}
      </h2>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <button onClick={() => action("addwin", 1)}>
          +1 WIN
        </button>

        <button onClick={() => action("addwin", 5)}>
          +5 WINS
        </button>

        <button onClick={() => action("removewin", 1)}>
          -1 WIN
        </button>

        <button onClick={() => action("resetwins", 1)}>
          RESET WINS
        </button>

        <button onClick={() => action("addmulti", 1)}>
          +1 MULTI
        </button>

        <button onClick={() => action("removemulti", 1)}>
          -1 MULTI
        </button>

        <button onClick={() => action("doublemulti", 1)}>
          x2 MULTI
        </button>

        <button onClick={() => action("resetmulti", 1)}>
          RESET MULTI
        </button>
      </div>
    </main>
  );
}