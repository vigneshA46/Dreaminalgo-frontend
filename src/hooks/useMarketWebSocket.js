import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://dreaminalgo-backend-production.up.railway.app";

export const useMarketWebSocket = () => {
  const [ltpData, setLtpData] = useState({
    NIFTY: null,
    BANKNIFTY: null,
    FINNIFTY: null,
    MIDCAP: null,
    SENSEX: null,
  });

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("✅ Market socket connected");
    });

    socket.on("telemetry", (data) => {
      // 👇 filter only stock data
      if (data.type === "stock" && data.index && data.ltp) {
        setLtpData((prev) => ({
          ...prev,
          [data.index]: parseFloat(data.ltp),
        }));
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Market socket disconnected");
    });

    return () => socket.disconnect();
  }, []);

  return ltpData;
};