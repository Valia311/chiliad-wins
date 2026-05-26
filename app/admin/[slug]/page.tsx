"use client";

import { use, useEffect, useState } from "react";

export default function AdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [data, setData] = useState<any>(null);
  const [customAmount, setCustomAmount] = useState<number>(1);

  async function refresh() {
    const res = await fetch(`/api/settings/${slug}`);
    const json = await res.json();
    setData(json);
  }

  async function action(type: string, amount: number = 1) {
    await fetch(`/api/hook/${slug}/${type}/${amount}`, {
      method: "POST",
    });

    refresh();
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: "40px" }}>CHILIAD ADMIN PANEL</h1>

        <h2>Utilisateur : {slug}</h2>

        <div style={{ fontSize: "30px", marginBottom: "20px" }}>
          Wins :{" "}
          <span style={{ color: data.wins < 0 ? "red" : "white" }}>
            {data.wins}
          </span>
        </div>

        <div style={rowStyle}>
          <button onClick={() => action("addwin", 1)} style={buttonStyle}>
            + WIN
          </button>

          <button onClick={() => action("removewin", 1)} style={buttonStyle}>
            - WIN
          </button>

          <button onClick={() => action("resetwins", 1)} style={redButton}>
            RESET
          </button>
        </div>

        <div style={rowStyle}>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            onClick={() => action("addwin", customAmount)}
          >
            + {customAmount} WINS
          </button>

          <button
            style={redButton}
            onClick={() => action("removewin", customAmount)}
          >
            - {customAmount} WINS
          </button>
        </div>

        <hr style={hrStyle} />

        <h2>Multiplier : x{data.multiplier}</h2>

        <div style={rowStyle}>
          <button onClick={() => action("addmulti", 1)} style={buttonStyle}>
            + MULTI
          </button>

          <button onClick={() => action("doublemulti", 1)} style={buttonStyle}>
            x2 MULTI
          </button>

          <button onClick={() => action("removemulti", 1)} style={redButton}>
            - MULTI
          </button>

          <button onClick={() => action("resetmulti", 1)} style={redButton}>
            RESET MULTI
          </button>
        </div>

        <hr style={hrStyle} />

        <h2>PREVIEW</h2>

        <div
          style={{
            color: data.color,
            fontFamily: data.font,
            fontSize: "100px",
            fontWeight: "bold",
            textShadow: "0 0 20px black",
            marginTop: "20px",
          }}
        >
          WINS :{" "}
          <span style={{ color: data.wins < 0 ? "red" : "white" }}>
            {data.wins}
          </span>

          {data.multiplier >= 2 && <div>x{data.multiplier}</div>}
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#0f0f0f",
  color: "white",
  padding: "40px",
  fontFamily: "Arial",
};

const cardStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  background: "#1a1a1a",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 0 30px rgba(0,0,0,0.5)",
};

const rowStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap" as const,
};

const buttonStyle = {
  padding: "15px 25px",
  borderRadius: "12px",
  border: "none",
  background: "#5865F2",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "18px",
};

const redButton = {
  ...buttonStyle,
  background: "#ff3b3b",
};

const inputStyle = {
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #444",
  background: "#222",
  color: "white",
  fontSize: "18px",
};

const hrStyle = {
  border: "1px solid #333",
  margin: "30px 0",
};