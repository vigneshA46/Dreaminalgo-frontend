import { useEffect, useRef, useState } from "react";

const WS_URL = "wss://dhanwebsocketservice-production-7979.up.railway.app";

export const useMarketWebSocket = () => {
  const wsRef = useRef(null);

  const [ltpData, setLtpData] = useState({
    NIFTY: null,
    BANKNIFTY: null,
    FINNIFTY: null,
    MIDCAP: null,
    SENSEX: null,
  });

  useEffect(() => {
    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.index && data.ltp) {
          setLtpData((prev) => ({
            ...prev,
            [data.index]: parseFloat(data.ltp),
          }));
        }
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    wsRef.current.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return ltpData;
};