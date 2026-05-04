import React, { useState, useCallback } from "react";
import { useLiveStore } from "../components/liveStore.js";
import { Table, Text, ActionIcon, Button } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const StrategyRow = React.memo(({  strategy,
  index,
  isOpen,
  onToggle,
  renderExpanded,
  fetchstatistics,
  cumulativePnl }) => {
  const live = useLiveStore((s) => s.liveData[strategy.id]);


/*   const toggle = useCallback(() => {
    setOpened((prev) => {
        const next = !prev;

        if (next) {
        props.fetchDates(strategy.id);
        }

        return next;
    });
    }, []);
 */
  const displayPnl =
    live?.pnl ??
    cumulativePnl[strategy.id] ??
    strategy.latest_cum_pnl;

  return (
    <>
      <Table.Tr>
        <Table.Td>{index + 1}</Table.Td>

        <Table.Td fw={500}>
          {strategy.name} - {strategy.state_id}
        </Table.Td>

        <Table.Td>{live?.status || "CLOSED"}</Table.Td>

        <Table.Td
          style={{
            color: displayPnl >= 0 ? "#16a34a" : "#dc2626",
            fontWeight: 600,
          }}
        >
          {Number(displayPnl || 0).toFixed(2)}
        </Table.Td>

        <Table.Td>
          <ActionIcon onClick={onToggle}>
  {isOpen ? <IconChevronUp style={{background:"#fff", color:"#000",border:"1px solid white" }}  /> : <IconChevronDown style={{background:"#fff", color:"#000",border:"1px solid white" }}/>}
</ActionIcon>
        </Table.Td>

        <Table.Td>
          <Button
            size="xs"
            radius="1rem"
            onClick={() => fetchstatistics(strategy.id)}
            bg="#000"
          >
            Statistics
          </Button>
        </Table.Td>
      </Table.Tr>

      {isOpen && renderExpanded(strategy, live)}
    </>
  );
});

export default StrategyRow;