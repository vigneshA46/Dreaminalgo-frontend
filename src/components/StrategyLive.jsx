import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://dreaminalgo-backend-production.up.railway.app"; // change if needed
const RUN_ID = "test_run_123"; // same as Postman

export default function StrategyLive() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io("https://dreaminalgo-backend-production.up.railway.app", {
     // transports: ["websocket"], // avoid polling issues
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      setConnected(true);

    });

    socket.on("strategy_update", (incoming) => {
      console.log("🔥 Live Data:", incoming);
      setData(incoming);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Strategy Live Dashboard</h2>

      <p>
        Status:{" "}
        <strong style={{ color: connected ? "green" : "red" }}>
          {connected ? "CONNECTED" : "DISCONNECTED"}
        </strong>
      </p>

      {data ? (
        <div style={{ marginTop: 20 }}>
          <h3>Strategy: {data.strategy_id}</h3>
          <p>Run ID: {data.run_id}</p>
          <p>Status: {data.status}</p>

          <hr />

          <h3>💰 PnL</h3>
          <p>Total: {data.pnl}</p>
          <p>Percentage: {data.pnl_percentage}%</p>

          <hr />

          <h3>📈 CE</h3>
          <p>LTP: {data.ce_ltp}</p>
          <p>PnL: {data.ce_pnl}</p>

          <h3>📉 PE</h3>
          <p>LTP: {data.pe_ltp}</p>
          <p>PnL: {data.pe_pnl}</p>
        </div>
      ) : (
        <p>No data yet...</p>
      )}
    </div>
  );
}
 