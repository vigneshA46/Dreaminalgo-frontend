import React from "react";
import { Badge, Group, Paper, Table, Tabs, Text } from "@mantine/core";
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
              <Table.Td fw={600}>{k === "T0" ? "No target touched" : k}</Table.Td>
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

/** The option's 5-min candles with the Supertrend (10, 3) value and trend, flips, and the trades on their candles. */
export const SupertrendPanel = ({ supertrend, trades = [] }) => {
  if (!supertrend?.CE?.length) return null;
  const marks = (side, c) => {
    const out = [];
    for (const t of trades.filter((x) => x.side === side)) {
      if (t.entryTime === c.end) out.push({ key: `in${t.entryTime}`, color: "teal", text: `BUY @ ${t.entryPrice}` });
      if (t.exitTime === c.end) out.push({ key: `out${t.exitTime}${t.entryTime}`, color: pnlColor(t.pnl), text: `EXIT ${inr(t.pnl)}` });
    }
    return out;
  };
  return (
    <Paper withBorder radius="md" p="md">
      <Text fw={600} mb={2}>
        Supertrend (10, 3)
      </Text>
      <Text size="xs" c="dimmed" mb="sm">
        5-min candles of each option. The only exit is the trend turning from buy to sell on a candle close; the filled price is the next tick.
        {supertrend.warmup?.CE ? ` Warmed up on ${supertrend.warmup.CE.candles} (CE) / ${supertrend.warmup.PE?.candles ?? 0} (PE) previous-day candles.` : ""}
      </Text>
      <Tabs defaultValue="CE" keepMounted={false}>
        <Tabs.List mb="sm">
          {["CE", "PE"].map((s) => (
            <Tabs.Tab key={s} value={s}>
              {s}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {["CE", "PE"].map((s) => (
          <Tabs.Panel key={s} value={s}>
            <Table.ScrollContainer minWidth={640} mah={420}>
              <Table verticalSpacing={4} fz="sm" striped stickyHeader>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Candle</Table.Th>
                    <Table.Th ta="right">Open</Table.Th>
                    <Table.Th ta="right">High</Table.Th>
                    <Table.Th ta="right">Low</Table.Th>
                    <Table.Th ta="right">Close</Table.Th>
                    <Table.Th ta="right">Supertrend</Table.Th>
                    <Table.Th>Trend</Table.Th>
                    <Table.Th>Trades</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {supertrend[s].map((c) => {
                    const m = marks(s, c);
                    return (
                      <Table.Tr key={c.time} bg={c.flip || m.length ? "var(--mantine-color-yellow-0)" : undefined}>
                        <Table.Td style={{ whiteSpace: "nowrap" }}>
                          {c.time} – {c.end}
                        </Table.Td>
                        <Table.Td ta="right">{c.open}</Table.Td>
                        <Table.Td ta="right">{c.high}</Table.Td>
                        <Table.Td ta="right">{c.low}</Table.Td>
                        <Table.Td ta="right" fw={600}>
                          {c.close}
                        </Table.Td>
                        <Table.Td ta="right" c="dimmed">
                          {c.supertrend ?? "-"}
                        </Table.Td>
                        <Table.Td>
                          {c.trend ? (
                            <Badge size="xs" variant="light" color={c.trend === "buy" ? "teal" : "red"}>
                              {c.trend}
                              {c.flip ? ` · ${c.flip}` : ""}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </Table.Td>
                        <Table.Td>
                          <Group gap={4} wrap="wrap">
                            {m.map((x) => (
                              <Badge key={x.key} size="xs" variant="light" color={x.color}>
                                {x.text}
                              </Badge>
                            ))}
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  );
};
