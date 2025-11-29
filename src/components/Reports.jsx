import React, { useState } from 'react';
import { MantineProvider, Box, Container, Group, Button, Select, TextInput, Table, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const Reports = () => {

  const [activeTab, setActiveTab] = useState('reports');

  const strategies = [
    {
      id: 1,
      name: 'Nifty Futures VWAP strategy (3X in PT) - ID: 7588597',
      pnl: -11489.98,
      isProfit: false,
    },
    {
      id: 2,
      name: 'Nifty 3 min Supertrend Strategy 20 points target - ID: 7935349',
      pnl: 1578.75,
      isProfit: true,
    },
    {
      id: 3,
      name: 'Nifty 1st 1 min close average price for 35 Points TGT - 8259679',
      pnl: 40614.75,
      isProfit: true,
    },
    {
      id: 4,
      name: 'Nifty 3 min Supertrend Strategy 20 points target Inamul Hasan 5k risk',
      pnl: -547.5,
      isProfit: false,
    },
    {
      id: 5,
      name: 'Nifty 3 min Supertrend Strategy 20 points target inamul hasan - ID. - 8290751',
      pnl: -8726.25,
      isProfit: false,
    },
    {
      id: 6,
      name: 'Banknifty option buying 1st 1 min candle average price open and close - ID - 8529033',
      pnl: -22275.76,
      isProfit: false,
    },
  ];


  return (
     <Box style={{ backgroundColor: '#ffffffff', minHeight: '100vh' }}>
      <Text size='1.5rem' fw={"600"} pb={"1rem"} >Reports</Text>
        <Container size="xl" style={{ maxWidth: '1400px' }}>
          {/* Tabs */}
          <Group gap="md" mb="xl">
            <Button
              size="md"
              radius="xl"
              style={{
                backgroundColor: activeTab === 'reports' ? '#000000ff' : 'transparent',
                color: activeTab === 'reports' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </Button>
            <Button
              size="md"
              radius="xl"
              variant="subtle"
              style={{
                backgroundColor: activeTab === 'orderbook' ? '#000000ff' : 'transparent',
                color: activeTab === 'orderbook' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('orderbook')}
            >
              Orderbook
            </Button>
            <Button
              size="md"
              radius="xl"
              variant="subtle"
              style={{
                backgroundColor: activeTab === 'openPositions' ? '#000000ff' : 'transparent',
                color: activeTab === 'openPositions' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('openPositions')}
            >
              Open Positions
            </Button>
          </Group>

          {/* Filters */}
          <Group gap="md" mb="xl" align="flex-end" style={{ flexWrap: 'wrap' }}>
            <Box style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <Text size="sm" fw={500} mb={8} c="#495057">
                Select Strategy
              </Text>
              <Select
                placeholder="Strategy"
                data={['Strategy']}
                styles={{
                  input: {
                    border: '1px solid #dee2e6',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    fontSize: '15px',
                    padding: '10px 12px',
                    height: '42px',
                  },
                }}
              />
            </Box>

            <Box style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <Text size="sm" fw={500} mb={8} c="#495057">
                Select Broker
              </Text>
              <Select
                placeholder="Broker"
                data={['Broker']}
                styles={{
                  input: {
                    border: '1px solid #dee2e6',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    fontSize: '15px',
                    padding: '10px 12px',
                    height: '42px',
                  },
                }}
              />
            </Box>

            <Box style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <Text size="sm" fw={500} mb={8} c="#495057">
                Select Date Range
              </Text>
              <Group gap={8} style={{ flexWrap: 'nowrap' }}>
                <TextInput
                  value="Nov 29, 2024 to Nov 29, 2024"
                  readOnly
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      fontSize: '15px',
                      padding: '10px 12px',
                      height: '42px',
                      flex: 1,
                    },
                  }}
                  style={{ flex: 1 }}
                />
                <Button
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    height: '42px',
                    minWidth: '42px',
                  }}
                >
                  <IconSearch size={18} color="#495057" />
                </Button>
              </Group>
            </Box>
          </Group>

          {/* Table */}
          <Box
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Table
              horizontalSpacing="md"
              verticalSpacing="lg"
              style={{
                minWidth: '100%',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#f8f9fa' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px', width: '80px' }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Strategy
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px', width: '150px' }}>
                    PNL
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px', width: '120px' }}>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {strategies.map((strategy) => (
                  <Table.Tr key={strategy.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <Table.Td style={{ padding: '20px 16px', color: '#495057', fontSize: '15px' }}>
                      {strategy.id}
                    </Table.Td>
                    <Table.Td style={{ padding: '20px 16px', color: '#212529', fontSize: '15px' }}>
                      {strategy.name}
                    </Table.Td>
                    <Table.Td style={{ padding: '20px 16px' }}>
                      <Text
                        size="md"
                        fw={600}
                        style={{
                          color: strategy.isProfit ? '#2b8a3e' : '#dc3545',
                        }}
                      >
                        ₹ {strategy.isProfit ? '' : '-'}{Math.abs(strategy.pnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ padding: '20px 16px' }}>
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: '#000000ff',
                          borderRadius: '6px',
                          fontWeight: 500,
                          paddingLeft: '24px',
                          paddingRight: '24px',
                        }}
                      >
                        Details
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>

          {/* Footer */}
         {/*  <Group justify="space-between" mt="xl" pt="xl" style={{ borderTop: '1px solid #e9ecef' }}>
            <Text size="sm" c="#495057">
              Contact Us
            </Text>
            <Text size="sm" c="#495057">
              Terms and Conditions
            </Text>
            <Text size="sm" c="#495057">
              Privacy policy
            </Text>
          </Group> */}
        </Container>
      </Box>
  )
}

export default Reports