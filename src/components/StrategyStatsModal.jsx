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

import { Table } from "@mantine/core";

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

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>Strategy Statistics</Title>}
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
              <Text size="sm" color="dimmed">Total Trades</Text>
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

        {/* 🔹 Monthly Returns */}
        <Card radius="lg" p="md">
          <Text fw={600} mb="sm">Monthly Returns</Text>

          <Stack gap="xs">
            {monthly.map((m, index) => {
              const val = parseFloat(m.monthly_return);

              return (
                <Group key={index} justify="space-between">
                  <Text>{m.month}</Text>
                  <Text c={val >= 0 ? "green" : "red"} fw={600}>
                    ₹ {val.toFixed(2)}
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