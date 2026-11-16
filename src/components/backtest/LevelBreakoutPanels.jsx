import React from "react";
import { Group, Paper, Table, Text } from "@mantine/core";
import { SideBadge } from "./BacktestRunPage";
import { inr, pnlColor } from "./backtestUtils";

/** One option's levels for the day: buy side (traded) and sell side (reference). */
export const LevelsTable = ({ side, L, trades }) => {
  const touched = Math.max(0, ...trades.filter((t) => t.side === side).map((t) => t.targetsHit));
  return (
    <Paper withBorder radius="md" p="md">
      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          <SideBadge side={side} />
          <Text fw={600}>Levels</Text>
        </Group>
        <Text size="xs" c="dimmed">
          prev H {L.prevHigh} · L {L.prevLow} · open {L.open} · range {L.range}
        </Text>
      </Group>
      <Table verticalSpacing={4} fz="sm" withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th ta="right">Buy side</Table.Th>
            <Table.Th ta="right">Sell side (ref)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td fw={600}>Entry</Table.Td>
            <Table.Td ta="right" fw={700} c="blue">
              buy above {L.buyAbove}
            </Table.Td>
            <Table.Td ta="right" c="dimmed">
              sell below {L.sellBelow}
            </Table.Td>
          </Table.Tr>
          {L.buyTargets.map((v, i) => (
            <Table.Tr key={i}>
              <Table.Td>T{i + 1}</Table.Td>
              <Table.Td ta="right" c={i < touched ? "teal" : undefined} fw={i < touched ? 700 : undefined}>
                {v}
              </Table.Td>
              <Table.Td ta="right" c="dimmed">
                {L.sellTargets[i]}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {touched > 0 && (
        <Text size="xs" c="teal" mt={6}>
          Highlighted: targets touched by a trade today (best T{touched})
        </Text>
      )}
    </Paper>
  );
};

export const TargetsReachedPanel = ({ byTargetsHit }) => {
  const rows = Object.entries(byTargetsHit || {}).sort((a, b) => Number(a[0].slice(1)) - Number(b[0].slice(1)));
  if (!rows.length) return null;
  return (
    <Paper withBorder radius="md" p="md">
      <Text fw={600} mb="sm">
        P&L by highest target reached
      </Text>
      <Table verticalSpacing="xs" fz="sm" maw={420}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Reached</Table.Th>
            <Table.Th ta="right">Trades</Table.Th>
            <Table.Th ta="right">P&L</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map(([k, v]) => (
            <Table.Tr key={k}>
              <Table.Td fw={600}>{k === "T0" ? "No target (SL −20 / 15:14)" : k}</Table.Td>
              <Table.Td ta="right">{v.trades}</Table.Td>
              <Table.Td ta="right" fw={600} c={pnlColor(v.pnl)}>
                {inr(v.pnl)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};
