import React from "react";
import { Alert, Anchor, Box, Center, Loader } from "@mantine/core";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import BacktestRunPage from "./BacktestRunPage";
import { STRATEGY_VIEWS } from "./strategyViews";
import { useMyBacktests } from "./useMyBacktests";

/** /backtest/:key — run page for one allowed strategy. */
const BacktestStrategy = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, strategies, error } = useMyBacktests();

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  const strategy = strategies.find((s) => s.key === key);
  const view = STRATEGY_VIEWS[key];

  if (error || !strategy || !view) {
    return (
      <Box p="md" maw={640}>
        <Anchor size="sm" onClick={() => navigate("/backtest")} mb="sm" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <IconArrowLeft size={14} /> Backtest
        </Anchor>
        <Alert color="red" icon={<IconAlertCircle />} title="Backtest not available">
          {error || "You don't have access to this backtest."}
        </Alert>
      </Box>
    );
  }

  return <BacktestRunPage config={{ ...view, key, title: strategy.title, subtitle: strategy.description }} />;
};

export default BacktestStrategy;
