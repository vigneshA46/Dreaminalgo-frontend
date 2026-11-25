import React, { useCallback, useEffect, useState } from "react";
import { Alert, Box, Button, Center, Group, Loader, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconAlertCircle, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import api from "../../utils/api";
import { RangeResults } from "./BacktestRunPage";
import "@mantine/dates/styles.css";

/** Previous (saved) backtests of one strategy, same layout as a range run: overall analysis + one dropdown per day. */
const SavedBacktests = ({ strategyKey, config }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (f, t) => {
      setLoading(true);
      setError(null);
      const params = {};
      if (f) params.from = dayjs(f).format("YYYY-MM-DD");
      if (t) params.to = dayjs(t).format("YYYY-MM-DD");
      const url = `/api/backtest-access/my/saved/${strategyKey}`;
      try {
        let res;
        try {
          res = await api.get(url, { params });
        } catch (err) {
          if (err.response?.status !== 401) throw err;
          await api.post("/api/auth/refresh");
          res = await api.get(url, { params });
        }
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Could not load the saved backtests");
      } finally {
        setLoading(false);
      }
    },
    [strategyKey]
  );

  useEffect(() => {
    load(null, null);
  }, [load]);

  return (
    <Stack gap="lg">
      <Paper withBorder radius="md" p="md">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" maw={760}>
          <DateInput label="From" placeholder="Any" value={from} onChange={setFrom} valueFormat="DD MMM YYYY" maxDate={to || undefined} clearable />
          <DateInput label="To" placeholder="Any" value={to} onChange={setTo} valueFormat="DD MMM YYYY" minDate={from || undefined} clearable />
          <Button mt={{ base: 0, sm: 25 }} leftSection={<IconSearch size={16} />} loading={loading} onClick={() => load(from, to)}>
            Show
          </Button>
        </SimpleGrid>
        <Text size="xs" c="dimmed" mt="sm">
          Saved backtests are shared by everyone with access to this strategy, one saved version per day. Without dates the last year is shown.
        </Text>
      </Paper>

      {loading && !data && (
        <Center py="xl">
          <Loader />
        </Center>
      )}
      {error && (
        <Alert color="red" icon={<IconAlertCircle />} title="Could not load">
          {error}
        </Alert>
      )}
      {data && data.days.length === 0 && !loading && (
        <Alert color="yellow" icon={<IconAlertCircle />} title="Nothing saved yet">
          No saved backtests for this strategy{from || to ? " in this period" : ""}.
        </Alert>
      )}
      {data && data.days.length > 0 && (
        <Box style={{ opacity: loading ? 0.6 : 1 }}>
          <Group mb="xs">
            <Text size="sm" c="dimmed">
              {data.days.length} saved day{data.days.length === 1 ? "" : "s"}
            </Text>
          </Group>
          <RangeResults result={data} config={config} />
        </Box>
      )}
    </Stack>
  );
};

export default SavedBacktests;
