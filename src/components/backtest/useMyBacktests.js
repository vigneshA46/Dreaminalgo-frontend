import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";

/** Strategies an admin has allowed this user to backtest. */
export const useMyBacktests = () => {
  const [state, setState] = useState({ loading: true, strategies: [], error: null });
  useEffect(() => {
    let alive = true;
    apiRequest("GET", "/api/backtest-access/my/strategies")
      .then((rows) => alive && setState({ loading: false, strategies: rows || [], error: null }))
      .catch(() => alive && setState({ loading: false, strategies: [], error: "Could not load your backtests. Please refresh." }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
};
