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