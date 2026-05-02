import {
  Modal,
  Card,
  Text,
  Group,
  Stack,
  Grid,
  Badge,
  Title
} from "@mantine/core";
import autoTable from "jspdf-autotable";


import { Table } from "@mantine/core";
import { Select } from "@mantine/core";
import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StrategyStatsModal = ({ opened, onClose, statistics }) => {
  if (!statistics) return null;

  const daily = statistics?.daily || [];
const monthly = statistics?.monthly || [];


  

  // ✅ Convert to numbers
const dayPnls = daily.length
  ? daily.map(d => parseFloat(d.day_pnl))
  : [0];
  const totalDays = dayPnls.length;

  const maxProfit = Math.max(...dayPnls);
  const maxLoss = Math.min(...dayPnls);

  const winDays = dayPnls.filter(p => p > 0).length;
  const lossDays = dayPnls.filter(p => p < 0).length;

  const totalPnl = parseFloat(statistics.summary?.total_pnl || 0);
  const totalTrades = parseInt(statistics.summary?.total_trades || 0);

  const strategy = statistics?.strategy || {};

const profits = dayPnls.filter(p => p > 0);
const losses = dayPnls.filter(p => p < 0);

// ✅ Basic
const avgDaily = totalDays ? totalPnl / totalDays : 0;
const avgProfitDays = profits.length
  ? profits.reduce((a, b) => a + b, 0) / profits.length
  : 0;

const avgLossDays = losses.length
  ? losses.reduce((a, b) => a + b, 0) / losses.length
  : 0;

// ✅ Monthly Avg
const avgMonthly =
  monthly.length
    ? monthly.reduce((a, m) => a + parseFloat(m.monthly_return), 0) / monthly.length
    : 0;

// ✅ Max Winning / Losing Streak
let maxWinStreak = 0;
let maxLossStreak = 0;
let winStreak = 0;
let lossStreak = 0;

dayPnls.forEach(p => {
  if (p > 0) {
    winStreak++;
    lossStreak = 0;
  } else if (p < 0) {
    lossStreak++;
    winStreak = 0;
  } else {
    winStreak = 0;
    lossStreak = 0;
  }

  if (winStreak > maxWinStreak) maxWinStreak = winStreak;
  if (lossStreak > maxLossStreak) maxLossStreak = lossStreak;
});


const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  return new Date(d.setDate(diff));
};



const formatDate = (d) =>
  new Date(d).toISOString().split("T")[0];

// ✅ Build week map
const weekMap = {};

daily.forEach((d) => {
  const dateObj = new Date(d.date);
  const weekStart = formatDate(getWeekStart(dateObj));

  if (!weekMap[weekStart]) {
    weekMap[weekStart] = {};
  }

  const dayName = dateObj.toLocaleString("en-US", {
    weekday: "short",
  }); // Mon, Tue...

  weekMap[weekStart][dayName] = {
    pnl: parseFloat(d.day_pnl),
    date: formatDate(dateObj),
  };
});


const weekOptions = Object.keys(weekMap)
  .sort((a, b) => new Date(b) - new Date(a)) // latest first
  .map((w) => ({
    value: w,
    label: `Week of ${w}`,
  }));

const [selectedWeek, setSelectedWeek] = useState(
  weekOptions[0]?.value
);


const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const selectedWeekData = weekMap[selectedWeek] || {};

const allWeeks = Object.keys(weekMap).sort(
  (a, b) => new Date(b) - new Date(a)
);

const capital = parseFloat(strategy.capital_required || 0);

// 🔹 Day format → 2026 - May - 02
const formatDayDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = String(d.getDate()).padStart(2, "0");

  return `${year} - ${month} - ${day}`;
};

// 🔹 Month format → 2026 - May
const formatMonth = (monthStr) => {
  const [year, month] = monthStr.split("-");
  const monthName = new Date(`${year}-${month}-01`).toLocaleString(
    "en-US",
    { month: "long" }
  );

  return `${year} - ${monthName}`;
};

// 🔹 % calc
const getPct = (pnl) => {
  if (!capital) return 0;
  return (pnl / capital) * 100;
};


const downloadStrategyReport = (statistics) => {
  const { daily = [], monthly = [], strategy = {} } = statistics;

  const capital = parseFloat(strategy.capital_required || 0);

  // 🔹 Format Day → 2026 - May - 02
  const formatDayDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "long" });
    const day = String(d.getDate()).padStart(2, "0");
    return `${year} - ${month} - ${day}`;
  };

  // 🔹 Format Month → 2026 - May
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    const monthName = new Date(`${year}-${month}-01`).toLocaleString(
      "en-US",
      { month: "long" }
    );
    return `${year} - ${monthName}`;
  };

  // 🔹 % calc
  const getPct = (pnl) => {
    if (!capital) return 0;
    return (pnl / capital) * 100;
  };

  const doc = new jsPDF();

  // 🔥 Title
  doc.setFontSize(16);
  doc.text("Strategy Report", 14, 15);

  // 🔹 Strategy Name
  doc.setFontSize(11);
  doc.text(`Strategy: ${strategy.name || "-"}`, 14, 22);
  doc.text(`Capital: ₹ ${capital}`, 14, 28);

  // =========================
  // 📅 DAY-WISE TABLE
  // =========================
  const dayRows = daily.map((d) => {
    const val = parseFloat(d.day_pnl);
    const pct = getPct(val);

    return [
      formatDayDate(d.date),
      `₹ ${val.toFixed(2)}`,
      `${pct.toFixed(2)}%`,
    ];
  });

  autoTable(doc, {
    startY: 35,
    head: [["Date", "PnL", "Return %"]],
    body: dayRows,
  });

  // =========================
  // 📅 MONTH-WISE TABLE
  // =========================
  const monthRows = monthly.map((m) => {
    const val = parseFloat(m.monthly_return);
    const pct = getPct(val);

    return [
      formatMonth(m.month),
      `₹ ${val.toFixed(2)}`,
      `${pct.toFixed(2)}%`,
    ];
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Month", "PnL", "Return %"]],
    body: monthRows,
  });

  // 🔥 Save
  doc.save("strategy-report.pdf");
};

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
  <Group justify="space-between" w="100%">
    <Title order={3}>Strategy Statistics</Title>

    <ActionIcon
      variant="light"
      color="blue"
      onClick={()=>downloadStrategyReport(statistics)}
    >
      <IconDownload size={18} />
    </ActionIcon>
  </Group>
}
      size="lg"
      centered
      radius="lg"
    >
      <Stack>
        <Card radius="lg" p="md">
  <Text fw={600} mb="sm">Strategy Overview</Text>
<Table striped highlightOnHover withTableBorder>
  <Table.Tbody>

    <Table.Tr>
      <Table.Td>Strategy Name</Table.Td>
      <Table.Td>{strategy.name}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Capital Required</Table.Td>
      <Table.Td>₹ {parseFloat(strategy.capital_required || 0)}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Total Trading Days</Table.Td>
      <Table.Td>{totalDays}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Total Win Days</Table.Td>
      <Table.Td>{winDays}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Total Loss Days</Table.Td>
      <Table.Td>{lossDays}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Max Winning Streak</Table.Td>
      <Table.Td>{maxWinStreak}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Max Losing Streak</Table.Td>
      <Table.Td>{maxLossStreak}</Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Avg Monthly Profit</Table.Td>
      <Table.Td c={avgMonthly >= 0 ? "green" : "red"}>
        ₹ {avgMonthly.toFixed(2)}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Total Profit</Table.Td>
      <Table.Td c={totalPnl >= 0 ? "green" : "red"}>
        ₹ {totalPnl.toFixed(2)}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Max Profit (Day)</Table.Td>
      <Table.Td c="green">
        ₹ {maxProfit.toFixed(2)}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Max Loss (Day)</Table.Td>
      <Table.Td c="red">
        ₹ {maxLoss.toFixed(2)}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Avg Daily PnL</Table.Td>
      <Table.Td c={avgDaily >= 0 ? "green" : "red"}>
        ₹ {avgDaily.toFixed(2)}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Avg Profit (Winning Days)</Table.Td>
      <Table.Td c="green">
        ₹ {avgProfitDays.toFixed(2)}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td>Avg Loss (Losing Days)</Table.Td>
      <Table.Td c="red">
        ₹ {avgLossDays.toFixed(2)}
      </Table.Td>
    </Table.Tr>

  </Table.Tbody>
</Table>
</Card>
        {/* 🔹 Summary */}
        <Grid>
          <Grid.Col span={6}>
            <Card shadow="sm" radius="lg" p="md">
              <Text size="sm" color="dimmed">Total PnL</Text>
              <Text size="xl" fw={700}>
                ₹ {totalPnl.toFixed(2)}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card shadow="sm" radius="lg" p="md">
              <Text size="sm" color="dimmed">Total Trading Days</Text>
              <Text size="xl" fw={700}>
                {totalTrades}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* 🔹 Daily Stats */}
        <Grid>
          <Grid.Col span={6}>
            <Card radius="lg" p="md">
              <Text size="sm" color="dimmed">Max Profit (Day)</Text>
              <Text fw={700} c="green">
                ₹ {maxProfit.toFixed(2)}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card radius="lg" p="md">
              <Text size="sm" color="dimmed">Max Loss (Day)</Text>
              <Text fw={700} c="red">
                ₹ {maxLoss.toFixed(2)}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* 🔹 Win / Loss */}

{/*         
        <Grid>
          <Grid.Col span={4}>
            <Card radius="lg" p="md">
              <Text size="sm">Win Days</Text>
              <Badge color="green" size="lg">{winDays}</Badge>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card radius="lg" p="md">
              <Text size="sm">Loss Days</Text>
              <Badge color="red" size="lg">{lossDays}</Badge>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card radius="lg" p="md">
              <Text size="sm">Total Days</Text>
              <Badge size="lg">{totalDays}</Badge>
            </Card>
          </Grid.Col>
        </Grid>
 */}
        <Card radius="lg" p="md">
  <Group justify="space-between" mb="sm">
    <Text fw={600}>Weekly Returns</Text>

    <Select
      data={weekOptions}
      value={selectedWeek}
      onChange={setSelectedWeek}
      w={200}
    />
  </Group>

  <Table striped highlightOnHover withTableBorder>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Day</Table.Th>
        <Table.Th>Date</Table.Th>
        <Table.Th>PNL</Table.Th>
      </Table.Tr>
    </Table.Thead>

    <Table.Tbody>
      {daysOrder.map((day) => {
        const d = selectedWeekData[day];

        return (
          <Table.Tr key={day}>
            <Table.Td>{day}</Table.Td>

            <Table.Td>
              {d ? d.date : "-"}
            </Table.Td>

            <Table.Td
            c={
              d
              ? d.pnl >= 0
              ? "green"
                : "red"
                : "dimmed"
              }
              > 
              {d
                ? `₹ ${d.pnl.toFixed(2)} (${getPct(d.pnl).toFixed(2)}%)`
                : "-"}
            </Table.Td>
          </Table.Tr>
        );
      })}
    </Table.Tbody>
  </Table>
</Card>

        {/* 🔹 Monthly Returns */}
    <Card radius="lg" p="md">
      <Text fw={600} mb={"1rem"}>Monthly Retunrs</Text>
      <Group justify="space-between" mb="sm">
        <Text fw={600}>Month</Text>
        <Text fw={600}>PNL</Text>
      </Group>

    <Stack gap="xs">
      {monthly.map((m, index) => {
        const val = parseFloat(m.monthly_return);

        // ✅ Convert "2026-05" → "2026-May"
        const [year, month] = m.month.split("-");
        const monthName = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
          month: "short"
        });

        return (
          <Group key={index} justify="space-between">
            <Text>{`${year}-${monthName}`}</Text>

            <Text c={val >= 0 ? "green" : "red"} fw={600}>
            ₹ {val.toFixed(2)} ({getPct(val).toFixed(2)}%)
            </Text>
          </Group>
          );
        })}
      </Stack>
    </Card>
      </Stack>

    </Modal>
  );
};


export default StrategyStatsModal;