import React from "react";
import { Badge, SimpleGrid, Text } from "@mantine/core";
import { ExitCell, PivotPnlPanel, PriceTime, SideBadge } from "./BacktestRunPage";
import { inr, pnlColor } from "./backtestUtils";
import { LevelsTable, TargetsReachedPanel } from "./LevelBreakoutPanels";
import { HourlyCyclesPanel } from "./HourlyCyclesPanel";
import { HourlyOptionsForm } from "./HourlyOptionsForm";
import { IndexCandlesPanel } from "./IndexCandlesPanel";
import { HOURLY_DEFAULT_OPTIONS, hourlyOptionsValid } from "./hourlyOptions";
import { BearishCandlesPanel, BearishSelectionPanel } from "./BearishPanels";
import { HullCandlesPanel } from "./HullCandlesPanel";
import { HullOptionsForm } from "./HullOptionsForm";
import { HULL_DEFAULT_OPTIONS, hullOptionsValid } from "./hullOptions";

/*
 * How each backtest's result is shown (stat tiles, trade-table columns, extra panels).
 * Same as the admin panel's strategy pages; key = backend strategy key.
 */

// ---------- pivot_option_buying_cum ----------
const PIVOT_OPTION_BUYING_CUM = {
  subtitle: "Runs one trading day on Dhan expired-options 1-minute data with your Dhan credentials",

  stats: (day, result) => [
    { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
    { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
    { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
    { label: "Trades", value: day.totalTrades, sub: `${day.targets} target · ${day.stopLosses} SL` },
    {
      label: "Win rate",
      value: `${result.summary?.winRatePct ?? 0}%`,
      sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
    },
    { label: "Max lot", value: result.summary?.maxLotUsed ?? "-", sub: `profit factor ${result.summary?.profitFactor ?? "-"}` },
  ],

  tradeColumns: [
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    { header: "Strike", render: (t) => <Text size="sm" fw={600}>{t.strike}</Text> },
    { header: "Lot (qty)", render: (t) => `${t.lot} (${t.quantity})` },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    { header: "Pivot", render: (t) => t.pivot },
    { header: "Entry reason", wrap: true, render: (t) => <Text size="xs">{t.entryReason}</Text> },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Side P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.sidePnlAfter)}>{inr(t.sidePnlAfter)}</Text> },
  ],
};

// ---------- nifty_option_pivot_buffer ----------
const NIFTY_OPTION_PIVOT_BUFFER = {
  subtitle: "Pivot touch → entry at pivot + 25% of the gap to the next pivot, target entry + 30% of the gap, SL back at the pivot. 1 lot, all tick based.",

  stats: (day, result) => [
    { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
    { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
    { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
    { label: "Trades", value: day.totalTrades, sub: `${day.targets} target · ${day.stopLosses} SL` },
    {
      label: "Win rate",
      value: `${result.summary?.winRatePct ?? 0}%`,
      sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
    },
    {
      label: "Profit factor",
      value: result.summary?.profitFactor ?? "-",
      sub: `${result.params?.lots ?? 1} lot · ${result.params?.lotSize ?? "-"} qty per trade`,
    },
  ],

  tradeColumns: [
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    { header: "Strike", render: (t) => <Text size="sm" fw={600}>{t.strike}</Text> },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    {
      header: "Pivot → next",
      wrap: true,
      render: (t) => (
        <>
          <Text size="sm">
            {t.pivot} → {t.nextPivot}
          </Text>
          <Text size="xs" c="dimmed">
            gap {t.gap}
          </Text>
        </>
      ),
    },
    {
      header: "Buffer / Target / SL",
      render: (t) => (
        <Text size="sm">
          {t.buffer} / <Text span c="teal" inherit>{t.target}</Text> / <Text span c="red" inherit>{t.stopLoss}</Text>
        </Text>
      ),
    },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "Points", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.points)}>{t.points}</Text> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Side P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.sidePnlAfter)}>{inr(t.sidePnlAfter)}</Text> },
  ],

  extraPanels: (day, result) => <PivotPnlPanel byPivot={result.summary?.byPivot} />,
};

// ---------- nifty_option_pivot_fixed_target ----------
const isTickEntry = (t) => t.entryReason?.startsWith("Tick");

const NIFTY_OPTION_PIVOT_FIXED_TARGET = {
  subtitle:
    "Pivot touch arms it → entry on a candle close above the pivot (avg-price rule) or a tick at pivot + 8. " +
    "Target entry + 10 points, SL candle close below the pivot. 1 lot.",

  stats: (day, result) => {
    const tick = day.trades.filter(isTickEntry).length;
    return [
      { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
      { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
      { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
      { label: "Trades", value: day.totalTrades, sub: `${day.targets} target · ${day.stopLosses} SL` },
      {
        label: "Win rate",
        value: `${result.summary?.winRatePct ?? 0}%`,
        sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
      },
      {
        label: "Entries",
        value: `${tick} / ${day.trades.length - tick}`,
        sub: `tick (pivot + 8) / candle close · PF ${result.summary?.profitFactor ?? "-"}`,
      },
    ];
  },

  tradeColumns: [
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    { header: "Strike", render: (t) => <Text size="sm" fw={600}>{t.strike}</Text> },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    { header: "Pivot", render: (t) => t.pivot },
    { header: "Target", render: (t) => <Text size="sm" c="teal">{t.target}</Text> },
    {
      header: "Entry type",
      render: (t) => (
        <Badge variant="light" color={isTickEntry(t) ? "cyan" : "indigo"}>
          {isTickEntry(t) ? "Tick +8" : "Candle close"}
        </Badge>
      ),
    },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "Points", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.points)}>{t.points}</Text> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Side P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.sidePnlAfter)}>{inr(t.sidePnlAfter)}</Text> },
  ],

  extraPanels: (day, result) => <PivotPnlPanel byPivot={result.summary?.byPivot} />,
};

// ---------- nifty_option_level_breakout ----------
const NIFTY_OPTION_LEVEL_BREAKOUT = {
  subtitle:
    "ATM from NIFTY 09:15 close. range = prev-day (H − L) × 26.11%, buy above = open + range, T1–T11 every range. " +
    "5-min close above buy above (first entry: above buy above + 13.06%) → buy 1 lot, SL entry − 20 until T1, then trail on 5-min close below the last target touched.",

  stats: (day, result) => [
    { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
    { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
    { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
    { label: "Trades", value: day.totalTrades, sub: `${day.trails} trail · ${day.stopLosses} SL` },
    {
      label: "Win rate",
      value: `${result.summary?.winRatePct ?? 0}%`,
      sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
    },
    { label: "ATM strike", value: day.atmStrike ?? "-", sub: `NIFTY ${day.niftyAtSelect ?? "-"} at 09:15 close` },
  ],

  tradeColumns: [
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    { header: "Strike", render: (t) => <Text size="sm" fw={600}>{t.strike}</Text> },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    { header: "Buy above", render: (t) => t.buyAbove },
    { header: "Initial SL", render: (t) => <Text size="sm" c="red">{t.initialSl}</Text> },
    {
      header: "Targets hit",
      render: (t) => (
        <Badge variant="light" color={t.targetsHit > 0 ? "teal" : "gray"}>
          {t.targetsHit > 0 ? `T${t.targetsHit}` : "none"}
        </Badge>
      ),
    },
    { header: "Trail stop", render: (t) => t.trailStop ?? "-" },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "Points", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.points)}>{t.points}</Text> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Side P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.sidePnlAfter)}>{inr(t.sidePnlAfter)}</Text> },
  ],

  extraPanels: (day, result) => (
    <>
      {day.levels?.CE && day.levels?.PE && (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <LevelsTable side="CE" L={day.levels.CE} trades={day.trades} />
          <LevelsTable side="PE" L={day.levels.PE} trades={day.trades} />
        </SimpleGrid>
      )}
      <TargetsReachedPanel byTargetsHit={result.summary?.byTargetsHit} />
    </>
  ),
};

// ---------- nifty_hourly_range_touch ----------
const NIFTY_HOURLY_RANGE_TOUCH = {
  subtitle:
    "NIFTY hourly High / Low (first 5 hours), each traded in the next hour. Touch a line → 3-min NIFTY close beyond it with " +
    "line < avg < close → buy ATM CE / PE, 1 lot. SL 3-min close back through the line. Cycle limits −₹3,500 / +₹5,000, max 2 entries.",

  stats: (day, result) => {
    const stopped = (day.cycles || []).filter((c) => c.stoppedBy);
    return [
      { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
      { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
      { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
      { label: "Trades", value: day.totalTrades, sub: `${day.targets} cycle target · ${day.stopLosses} SL` },
      {
        label: "Win rate",
        value: `${result.summary?.winRatePct ?? 0}%`,
        sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
      },
      {
        label: "Cycles stopped",
        value: `${stopped.length} / ${day.cycles?.length ?? 5}`,
        sub: stopped.map((c) => `C${c.cycle} ${c.stoppedBy.toLowerCase()}`).join(" · ") || "none",
      },
    ];
  },

  tradeColumns: [
    { header: "Cycle", render: (t) => <Badge variant="outline" radius="sm">C{t.cycle}</Badge> },
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    {
      header: "Strike",
      render: (t) => (
        <>
          <Text size="sm" fw={600}>
            {t.strike}
          </Text>
          {t.strikeType && t.strikeType !== "ATM" && (
            <Text size="xs" c="dimmed">
              {t.strikeType}
            </Text>
          )}
        </>
      ),
    },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    {
      header: "Line",
      render: (t) => (
        <Text size="sm" c={t.line === "HIGH" ? "teal" : "red"}>
          {t.line} {t.lineValue}
        </Text>
      ),
    },
    {
      header: "Signal candle",
      render: (t) => (
        <>
          <Text size="sm">close {t.signalCandle.close}</Text>
          <Text size="xs" c="dimmed">
            avg {t.signalCandle.avg}
          </Text>
        </>
      ),
    },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "Points", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.points)}>{t.points}</Text> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Cycle P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.cyclePnlAfter)}>{inr(t.cyclePnlAfter)}</Text> },
  ],

  extraPanels: (day, result) => <HourlyCyclesPanel cycles={day.cycles} params={result.params} />,
};

// ---------- nifty_hourly_range_touch_1m (same view, 1-min entry candles) ----------
const NIFTY_HOURLY_RANGE_TOUCH_1M = NIFTY_HOURLY_RANGE_TOUCH;

// ---------- nifty_hourly_range_touch_custom (same view + settings form) ----------
const NIFTY_HOURLY_RANGE_TOUCH_CUSTOM = {
  ...NIFTY_HOURLY_RANGE_TOUCH,
  dateRange: true,
  defaultOptions: HOURLY_DEFAULT_OPTIONS,
  OptionsForm: HourlyOptionsForm,
  optionsValid: hourlyOptionsValid,
  bottomPanels: (day, result) => (
    <IndexCandlesPanel candles={day.indexCandles} trades={day.trades} timeframe={result.params?.candleMinutes} />
  ),
};

// ---------- nifty_bearish_breakout_option_buying ----------
const NIFTY_BEARISH_BREAKOUT_OPTION_BUYING = {
  subtitle:
    "CE and PE run independently, each on one strike priced at or just above 200 at 09:30. The latest bearish 15-min candle marks its high; a tick above high + 4 buys 1 lot, " +
    "SL = low of that 15-min candle, then the stop follows the low − 2 of every completed 5-min Heikin Ashi candle (up or down). After an exit a fresh bearish 15-min candle is needed. Square off 15:14.",

  stats: (day, result) => [
    { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
    { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
    { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
    { label: "Trades", value: day.totalTrades, sub: `${day.trails} trail · ${day.stopLosses} candle-low SL` },
    {
      label: "Win rate",
      value: `${result.summary?.winRatePct ?? 0}%`,
      sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
    },
    { label: "Strikes", value: `${day.selection?.CE?.strike ?? "-"} / ${day.selection?.PE?.strike ?? "-"}`, sub: "CE / PE at 09:30" },
  ],

  tradeColumns: [
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    { header: "Strike", render: (t) => <Text size="sm" fw={600}>{t.strike}</Text> },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    {
      header: "Bearish candle",
      render: (t) => (
        <>
          <Text size="sm">{t.bearishCandle?.start}</Text>
          <Text size="xs" c="dimmed">
            high {t.markedHigh} → above {t.entryLevel}
          </Text>
        </>
      ),
    },
    { header: "Initial SL", render: (t) => <Text size="sm" c="red">{t.initialSl}</Text> },
    {
      header: "Last stop",
      render: (t) => (
        <>
          <Text size="sm">{t.finalSl}</Text>
          <Badge size="xs" variant="light" color={t.slMoves?.length ? "orange" : "gray"}>
            {t.slMoves?.length ? `${t.slMoves.length} HA move${t.slMoves.length === 1 ? "" : "s"}` : "candle low"}
          </Badge>
        </>
      ),
    },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "Points", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.points)}>{t.points}</Text> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Side P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.sidePnlAfter)}>{inr(t.sidePnlAfter)}</Text> },
  ],

  extraPanels: (day) => (
    <>
      <BearishSelectionPanel selection={day.selection} />
      <BearishCandlesPanel legCandles={day.legCandles} trades={day.trades} />
    </>
  ),
};

// ---------- nifty_hull_ma_option_buying ----------
const NIFTY_HULL_MA_OPTION_BUYING = {
  subtitle:
    "Hull MA 24 on NIFTY candles (your timeframe). The colour at 09:30 is the starting colour; every later candle close with a new colour is a signal — " +
    "green buys CE, red buys PE (ATM or ITM1–ITM5 from that candle's close), and the other side is closed. 1 lot, optional day MTM target and day MTM SL, square off 15:14.",
  defaultOptions: HULL_DEFAULT_OPTIONS,
  OptionsForm: HullOptionsForm,
  optionsValid: hullOptionsValid,

  stats: (day, result) => [
    { label: "Day P&L", value: inr(day.dayPnl), color: pnlColor(day.dayPnl) },
    { label: "CE P&L", value: inr(day.ce.pnl), color: pnlColor(day.ce.pnl) },
    { label: "PE P&L", value: inr(day.pe.pnl), color: pnlColor(day.pe.pnl) },
    { label: "Trades", value: day.totalTrades, sub: `${day.flips} colour change${day.flips === 1 ? "" : "s"}` },
    {
      label: "Win rate",
      value: `${result.summary?.winRatePct ?? 0}%`,
      sub: `avg win ${inr(result.summary?.avgWin)} · avg loss ${inr(result.summary?.avgLoss)}`,
    },
    { label: "Day stopped by", value: day.dayStoppedBy ? day.dayStoppedBy.replace("DAY MTM ", "") : "none", sub: day.dayStoppedBy ? "day MTM limit" : "ran to 15:14" },
  ],

  tradeColumns: [
    { header: "Side", render: (t) => <SideBadge side={t.side} /> },
    {
      header: "Strike",
      render: (t) => (
        <>
          <Text size="sm" fw={600}>
            {t.strike}
          </Text>
          <Text size="xs" c="dimmed">
            {t.strikeType}
          </Text>
        </>
      ),
    },
    { header: "Entry", render: (t) => <PriceTime price={t.entryPrice} time={t.entryTime} /> },
    { header: "Exit", render: (t) => <PriceTime price={t.exitPrice} time={t.exitTime} /> },
    {
      header: "Signal candle",
      render: (t) => (
        <>
          <Badge size="xs" variant="light" color={t.signalColor === "green" ? "teal" : "red"}>
            {t.signalColor}
          </Badge>
          <Text size="xs" c="dimmed">
            {t.signalCandle.start}–{t.signalCandle.end} · NIFTY {t.signalCandle.close}
          </Text>
        </>
      ),
    },
    { header: "Exit type", wrap: true, render: (t) => <ExitCell t={t} /> },
    { header: "Points", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.points)}>{t.points}</Text> },
    { header: "P&L", align: "right", render: (t) => <Text size="sm" fw={700} c={pnlColor(t.pnl)}>{inr(t.pnl)}</Text> },
    { header: "Day P&L", align: "right", render: (t) => <Text size="sm" c={pnlColor(t.dayPnlAfter)}>{inr(t.dayPnlAfter)}</Text> },
  ],

  bottomPanels: (day, result) => (
    <HullCandlesPanel candles={day.hmaCandles} trades={day.trades} timeframe={result.params?.candleMinutes} warmup={day.warmup} />
  ),
};

export const STRATEGY_VIEWS = {
  pivot_option_buying_cum: PIVOT_OPTION_BUYING_CUM,
  nifty_option_pivot_buffer: NIFTY_OPTION_PIVOT_BUFFER,
  nifty_option_pivot_fixed_target: NIFTY_OPTION_PIVOT_FIXED_TARGET,
  nifty_option_level_breakout: NIFTY_OPTION_LEVEL_BREAKOUT,
  nifty_hourly_range_touch: NIFTY_HOURLY_RANGE_TOUCH,
  nifty_hourly_range_touch_1m: NIFTY_HOURLY_RANGE_TOUCH_1M,
  nifty_hourly_range_touch_custom: NIFTY_HOURLY_RANGE_TOUCH_CUSTOM,
  nifty_bearish_breakout_option_buying: NIFTY_BEARISH_BREAKOUT_OPTION_BUYING,
  nifty_hull_ma_option_buying: NIFTY_HULL_MA_OPTION_BUYING,
};
