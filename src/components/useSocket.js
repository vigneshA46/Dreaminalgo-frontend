import { useEffect } from "react";
import { io } from "socket.io-client";
import { useLiveStore } from "./liveStore";

export const useSocket = () => {
  const updateStrategy = useLiveStore((s) => s.updateStrategy);

  useEffect(() => {
    const socket = io("https://algoapi.dreamintraders.in");

    socket.on("strategy_update", (incoming) => {
      updateStrategy(incoming);
    });

    return () => socket.disconnect();
  }, []);
};