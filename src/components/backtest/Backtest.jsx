import React from "react";
import { Alert, Box, Card, Center, Group, Loader, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import { IconAlertCircle, IconArrowRight, IconChartCandle, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMyBacktests } from "./useMyBacktests";

const Backtest = () => {
  const navigate = useNavigate();
  const { loading, strategies, error } = useMyBacktests();

  return (
    <Box p="md">
      <Text size="xl" fw={700}>
        Backtest
      </Text>
      <Text size="sm" c="dimmed" mb="lg">
        See how a strategy would have traded on any past day
      </Text>

      {loading && (
        <Center py="xl">
          <Loader />
        </Center>
      )}

      {error && (
        <Alert color="red" icon={<IconAlertCircle />}>
          {error}
        </Alert>
      )}

      {!loading && !error && strategies.length === 0 && (
        <Card withBorder radius="md" padding="xl" maw={560}>
          <Group gap="md" wrap="nowrap" align="flex-start">
            <ThemeIcon size={42} radius="md" variant="light" color="gray">
              <IconLock size={22} />
            </ThemeIcon>
            <div>
              <Text fw={600}>No backtests available yet</Text>
              <Text size="sm" c="dimmed">
                Backtesting is enabled per strategy. Contact support to get access to a strategy's backtest.
              </Text>
            </div>
          </Group>
        </Card>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {strategies.map((s) => (
          <Card
            key={s.key}
            withBorder
            radius="md"
            padding="lg"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/backtest/${s.key}`)}
          >
            <Group justify="space-between" mb="sm">
              <ThemeIcon size={42} radius="md" variant="light">
                <IconChartCandle size={24} />
              </ThemeIcon>
              <IconArrowRight size={20} color="gray" />
            </Group>
            <Text fw={600} mb={6} style={{ wordBreak: "break-word" }}>
              {s.title}
            </Text>
            <Text size="sm" c="dimmed">
              {s.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Backtest;
