import React, { useState } from "react";
import { Alert, Anchor, Box, Center, Loader, SegmentedControl, Text } from "@mantine/core";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import BacktestRunPage from "./BacktestRunPage";
import SavedBacktests from "./SavedBacktests";
import { STRATEGY_VIEWS } from "./strategyViews";
import { useMyBacktests } from "./useMyBacktests";

/** /backtest/:key — run page for one allowed strategy. */
const BacktestStrategy = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, strategies, error } = useMyBacktests();
  const [tab, setTab] = useState("run");

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

  // rights: run (older backends send no flags = run only), read = previous backtests, write = saves its runs
  const canRun = strategy.can_run !== false;
  const canRead = !!strategy.can_read;
  const canWrite = !!strategy.can_write;
  const config = { ...view, key, title: strategy.title, subtitle: strategy.description, canWrite };

  if (!canRead) return <BacktestRunPage config={config} />;

  const active = canRun ? tab : "saved";
  return (
    <Box style={{ width: 0, minWidth: "100%" }}>
      {canRun ? (
        <Box px="md" pt="md">
          <SegmentedControl
            value={tab}
            onChange={setTab}
            data={[
              { label: "Run backtest", value: "run" },
              { label: "Previous backtests", value: "saved" },
            ]}
          />
        </Box>
      ) : (
        <Box p="md" pb={0}>
          <Anchor size="sm" onClick={() => navigate("/backtest")} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <IconArrowLeft size={14} /> Backtest
          </Anchor>
          <Text size="xl" fw={700} mt="xs">
            {strategy.title}
          </Text>
          <Text size="sm" c="dimmed">
            Previous backtests
          </Text>
        </Box>
      )}
      {canRun && (
        <Box style={{ display: active === "run" ? "block" : "none" }}>
          <BacktestRunPage config={config} />
        </Box>
      )}
      {active === "saved" && (
        <Box p="md">
          <SavedBacktests strategyKey={key} config={config} />
        </Box>
      )}
    </Box>
  );
};

export default BacktestStrategy;
