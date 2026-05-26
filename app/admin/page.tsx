"use client";

import { useEffect, useState } from "react";

export default function Admin() {

  const [data, setData] = useState<any>(null);
  const [customAmount, setCustomAmount] = useState<number>(1);

  async function refresh() {

    const res = await fetch("/api/settings");

    const json = await res.json();

    setData(json);

  }

  async function action(
    type:string,
    amount:number = 1
  ) {

    await fetch("/api/win", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        secret: "secret123",
        action: type,
        amount
      })
    });

    refresh();

  }

  async function updateStyle(
    key:string,
    value:any
  ) {

    await fetch("/api/style", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        adminSecret: "admin123",
        [key]: value
      })
    });

    refresh();

  }

  useEffect(() => {

    refresh();

  }, []);

  if (!data) return null;

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#1a1a1a",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)"
        }}
      >

        <h1
          style={{
            fontSize: "40px",
            marginBottom: "20px"
          }}
        >
          CHILIAD ADMIN PANEL
        </h1>

        <div
          style={{
            fontSize: "30px",
            marginBottom: "20px"
          }}
        >
          Wins :{" "}

          <span
            style={{
              color:
                data.wins < 0
                  ? "red"
                  : "white"
            }}
          >
            {data.wins}
          </span>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap"
          }}
        >

          <button
            onClick={() => action("add")}
            style={buttonStyle}
          >
            + WIN
          </button>

          <button
            onClick={() => action("remove")}
            style={buttonStyle}
          >
            - WIN
          </button>

          <button
            onClick={() => action("reset")}
            style={redButton}
          >
            RESET
          </button>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            flexWrap: "wrap"
          }}
        >

          <input
            type="number"
            value={customAmount}
            onChange={(e) =>
              setCustomAmount(
                Number(e.target.value)
              )
            }
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            onClick={() =>
              action(
                "add",
                customAmount
              )
            }
          >
            + {customAmount} WINS
          </button>

          <button
            style={redButton}
            onClick={() =>
              action(
                "remove",
                customAmount
              )
            }
          >
            - {customAmount} WINS
          </button>

        </div>

        <hr style={hrStyle} />

        <h2>
          Multiplier : x{data.multiplier}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            flexWrap: "wrap"
          }}
        >

          <button
            style={buttonStyle}
            onClick={() =>
              updateStyle(
                "multiplier",
                data.multiplier + 1
              )
            }
          >
            + MULTI
          </button>

          <button
            style={buttonStyle}
            onClick={() =>
              updateStyle(
                "multiplier",
                data.multiplier * 2
              )
            }
          >
            x2 MULTI
          </button>

          <button
            style={redButton}
            onClick={() =>
              updateStyle(
                "multiplier",
                Math.max(
                  1,
                  data.multiplier - 1
                )
              )
            }
          >
            - MULTI
          </button>

        </div>

        <hr style={hrStyle} />

        <h2>Couleur</h2>

        <input
          type="color"
          value={data.color}
          onChange={(e) =>
            updateStyle(
              "color",
              e.target.value
            )
          }
          style={{
            width: "100px",
            height: "50px",
            border: "none",
            background: "none",
            marginBottom: "30px"
          }}
        />

        <hr style={hrStyle} />

        <h2>Police</h2>

        <select
          value={data.font}
          onChange={(e) =>
            updateStyle(
              "font",
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option>
            Arial
          </option>

          <option>
            Impact
          </option>

          <option>
            Verdana
          </option>

          <option>
            Tahoma
          </option>

          <option>
            Comic Sans MS
          </option>

        </select>

        <hr style={hrStyle} />

        <h2>PREVIEW</h2>

        <div
          style={{
            color: data.color,
            fontFamily: data.font,
            fontSize: "100px",
            fontWeight: "bold",
            textShadow:
              "0 0 20px black",
            marginTop: "20px"
          }}
        >
          WINS :{" "}

          <span
            style={{
              color:
                data.wins < 0
                  ? "red"
                  : "white"
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

    </div>

  );

}

const buttonStyle = {

  padding: "15px 25px",
  borderRadius: "12px",
  border: "none",
  background: "#5865F2",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "18px"

};

const redButton = {

  ...buttonStyle,
  background: "#ff3b3b"

};

const inputStyle = {

  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #444",
  background: "#222",
  color: "white",
  fontSize: "18px"

};

const hrStyle = {

  border: "1px solid #333",
  margin: "30px 0"

};