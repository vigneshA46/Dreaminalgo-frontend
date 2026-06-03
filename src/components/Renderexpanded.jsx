import { Select, Table } from "@mantine/core";
import { useCallback } from "react";



export const RenderExpanded = useCallback(({strategy, live , legs ,selectedDate ,setSelectedDate ,fetchLegsByDate , legPnls}) => {
  return (
    <>
      <Table.Tr>
        <Table.Td colSpan={7}>
            
          <Select
            label="Select Date"
            placeholder="Pick date"
            value={selectedDate[strategy.id] || null}
            data={(dates[strategy.id] || []).map((d, i) => {
              const pnl = dateWisePnL?.[strategy.id]?.[d] ?? 0;

              return {
                value: d,
                label: `${i + 1} ${dayjs(d).format("DD-MM-YYYY")} (₹ ${pnl.toFixed(2)})`
              };
            })}
            onChange={(value) => {
              setSelectedDate((prev) => ({
                ...prev,
                [strategy.id]: value,
              }));

              fetchLegsByDate(strategy.id, value);
            }}
            comboboxProps={{
              withinPortal: true,
              keepMounted: true
            }}
            mb="md"
          />
        </Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Td colSpan={7}>
          <Box  style={{ background: "#f8f9fa", borderRadius: "8px" }}>
        
        <Table
          horizontalSpacing="md"
          verticalSpacing="sm"
          style={{ width: "100%" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Symbol</Table.Th>
              {/* <Table.Th>QTY</Table.Th> */}
              <Table.Th>LTP ₹</Table.Th>
              <Table.Th>P&L ₹</Table.Th>
              <Table.Th>Val ₹</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
  {legs[strategy.id]?.length > 0 ? (
    legs[strategy.id].map((leg, i) => {

      const isToday = selectedDate[strategy.id] === dayjs().format("YYYY-MM-DD");
      
    const ltp = isToday
  ? (leg.leg === "CE"
      ? live?.ce_ltp
      : live?.pe_ltp)
  : "-"; // or store historical LTP if needed


    const pnl = isToday
  ? (leg.leg === "CE"
      ? live?.ce_pnl
      : live?.pe_pnl)
  : legPnls[strategy.id]?.[leg.token]?.pnl;

    const qty = 0;

    const val = qty * (ltp || 0);

      return (
        <Table.Tr key={leg.leg}>
          <Table.Td>{i + 1}</Table.Td>

          <Table.Td>
            <Text
    fw={500}
    style={{ cursor: "pointer", color: "#228be6" }}
    onClick={() => {

      const token = leg.token; // ✅ FIXED
      const date = selectedDate[strategy.id];

      setSelectedLegInfo({
        strategyId: strategy.id,
        token,
        date,
        leg: leg.leg
      });

      fetchTradesByToken(strategy.id, date, token);
    }}
  >
    {leg.symbol}
  </Text>
            <Text size="xs" c="dimmed">
              {leg.leg}
            </Text>
          </Table.Td>

          {/* <Table.Td>{qty}</Table.Td> */}

<Table.Td>{ltp ?? "-"}</Table.Td>

<Table.Td
  style={{
    color: pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 500
  }}
>
  {formatPnl(pnl)}
</Table.Td>

<Table.Td>{val.toFixed(2)}</Table.Td>
        </Table.Tr>
      );
    })
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={6}
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#868e96"
        }}
      >
        No Legs found
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
        </Table>
      </Box>
        </Table.Td>
      </Table.Tr>
    </>
  );
},  [
  legs,
  dates,
  selectedDate,
  dateWisePnL,
  legPnls,
  fetchLegsByDate
]);

