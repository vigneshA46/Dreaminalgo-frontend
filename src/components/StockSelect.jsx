import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Card,
  Stack,
  Group,
  Button,
  Text,
  Badge,
  Table,
  ScrollArea,
  FileInput,
  Loader,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Papa from "papaparse";
import dayjs from "dayjs";

import { apiRequest } from "../../utils/apiRequest";

export default function StockSelection() {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [todayStocks, setTodayStocks] = useState([]);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [todayResponse, historyResponse] = await Promise.all([
        apiRequest("GET", "/api/stock-option-strategy/today"),
        apiRequest("GET", "/api/stock-option-strategy/history"),
      ]);

      setTodayStocks(todayResponse.stocks || []);
      setHistory(historyResponse.stocks || []);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        try {
          const filteredStocks = results.data
            .filter((row) => {
              const pctChng = Number(
                String(row["%CHNG"] || 0).replace(/,/g, "")
              );

              const prevClose = Number(
                String(row["PREV. CLOSE"] || 0).replace(/,/g, "")
              );

              return pctChng > 1 && prevClose > 1000;
            })
            .slice(0, 2)
            .map((row) => ({
              symbol: row["SYMBOL"],

              prev_close: Number(
                String(row["PREV. CLOSE"] || 0).replace(/,/g, "")
              ),

              iep: Number(
                String(row["IEP"] || 0).replace(/,/g, "")
              ),

              chng: Number(
                String(row["CHNG"] || 0).replace(/,/g, "")
              ),

              pct_chng: Number(
                String(row["%CHNG"] || 0).replace(/,/g, "")
              ),

              final_price: Number(
                String(row["FINAL"] || 0).replace(/,/g, "")
              ),

              final_quantity: Number(
                String(row["FINAL QUANTITY"] || 0).replace(/,/g, "")
              ),

              value_cr: Number(
                String(row["VALUE (₹ Crores)"] || 0).replace(/,/g, "")
              ),

              ffm_cap_cr: Number(
                String(row["FFM CAP (₹ Crores)"] || 0).replace(/,/g, "")
              ),
            }));

          setSelectedStocks(filteredStocks);

          notifications.show({
            title: "CSV Processed",
            message: `${filteredStocks.length} stocks selected`,
            color: "green",
          });
        } catch (error) {
          notifications.show({
            title: "CSV Error",
            message: error.message,
            color: "red",
          });
        }
      },

      error: (error) => {
        notifications.show({
          title: "CSV Parse Error",
          message: error.message,
          color: "red",
        });
      },
    });
  };

  const saveStocks = async () => {
    try {
      if (selectedStocks.length !== 2) {
        notifications.show({
          title: "Invalid Selection",
          message: "Exactly 2 stocks must be selected",
          color: "red",
        });

        return;
      }

      setSaving(true);

      await apiRequest(
        "POST",
        "/api/stock-option-strategy",
        {
          trade_date: dayjs().format("YYYY-MM-DD"),
          stocks: selectedStocks,
        }
      );

      notifications.show({
        title: "Success",
        message: "Stocks saved successfully",
        color: "green",
      });

      fetchData();
    } catch (error) {
      notifications.show({
        title: "Save Failed",
        message: error.message,
        color: "red",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container size="xl" py="lg">
      <Stack>

        <Title order={2}>
          Stock Option Strategy Selection
        </Title>

        <Card shadow="sm" withBorder>
          <Stack>

            <FileInput
              label="Upload NSE CSV"
              placeholder="Select CSV file"
              accept=".csv"
              onChange={handleFileUpload}
            />

            {selectedStocks.length > 0 && (
              <>
                <Divider />

                <Title order={4}>
                  Selected Stocks
                </Title>

                <Group align="stretch">
                  {selectedStocks.map((stock) => (
                    <Card
                      key={stock.symbol}
                      withBorder
                      style={{
                        flex: 1,
                        minWidth: 250,
                      }}
                    >
                      <Stack gap="xs">
                        <Text fw={700}>
                          {stock.symbol}
                        </Text>

                        <Badge color="green">
                          {stock.pct_chng}%
                        </Badge>

                        <Text size="sm">
                          Prev Close: ₹{stock.prev_close}
                        </Text>

                        <Text size="sm">
                          IEP: ₹{stock.iep}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Group>

                <Button
                  onClick={saveStocks}
                  loading={saving}
                >
                  Save Stocks
                </Button>
              </>
            )}
          </Stack>
        </Card>

        <Card shadow="sm" withBorder>
          <Stack>

            <Title order={4}>
              Today's Saved Stocks
            </Title>

            {loading ? (
              <Loader />
            ) : (
              <ScrollArea>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Symbol</Table.Th>
                      <Table.Th>% Change</Table.Th>
                      <Table.Th>IEP</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {todayStocks.map((stock) => (
                      <Table.Tr key={stock.id}>
                        <Table.Td>{stock.symbol}</Table.Td>
                        <Table.Td>{stock.pct_chng}</Table.Td>
                        <Table.Td>{stock.iep}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            )}

          </Stack>
        </Card>

        <Card shadow="sm" withBorder>
          <Stack>

            <Title order={4}>
              History
            </Title>

            {loading ? (
              <Loader />
            ) : (
              <ScrollArea>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Date</Table.Th>
                      <Table.Th>Symbol</Table.Th>
                      <Table.Th>% Change</Table.Th>
                      <Table.Th>IEP</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {history.map((stock) => (
                      <Table.Tr key={stock.id}>
                        <Table.Td>
                          {dayjs(stock.trade_date).format(
                            "DD-MM-YYYY"
                          )}
                        </Table.Td>

                        <Table.Td>
                          {stock.symbol}
                        </Table.Td>

                        <Table.Td>
                          {stock.pct_chng}
                        </Table.Td>

                        <Table.Td>
                          {stock.iep}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            )}

          </Stack>
        </Card>

      </Stack>
    </Container>
  );
}