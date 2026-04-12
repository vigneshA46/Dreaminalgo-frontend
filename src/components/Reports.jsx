import React, { useEffect, useState } from 'react';
import { MantineProvider, Box, Container, Group, Button, Select, TextInput, Table, Text, ScrollArea } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { apiRequest } from '../utils/api';
import { Modal } from '@mantine/core';

const Reports = () => {

  const [activeTab, setActiveTab] = useState('reports');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [data, setData] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
  const getalluserdeployments = async () => {
    const res = await apiRequest('GET', '/api/deployments/userdep/all');

    if (res?.success) {
      setData(res.data);
    }
  };

  getalluserdeployments();
}, []);


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
          w={"100%"}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <ScrollArea  w={isMobile? '100vw':'100%'}
              type="auto"
              scrollbarSize={6}
              offsetScrollbars>
            <Table
              horizontalSpacing="md"
              verticalSpacing="lg"
              w={isMobile? '100vw':'100%'}
              style={{
                minWidth: '100%',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#f8f9fa' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px', width: '80px',whiteSpace: "nowrap" }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap" }}>
                    Strategy
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px', width: '150px',whiteSpace: "nowrap" }}>
                    PNL
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px', width: '120px',whiteSpace: "nowrap" }}>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
             <Table.Tbody>
  {data.map((strategy, index) => {
    const pnl = parseFloat(strategy.overall_cumulative_pnl || 0);
    const isProfit = pnl >= 0;

    return (
      <Table.Tr key={strategy.strategy_id}>
        <Table.Td>{index + 1}</Table.Td>

        <Table.Td>
          {strategy.strategy_name}
        </Table.Td>

        <Table.Td>
          <Text
            fw={600}
            style={{ color: isProfit ? '#2b8a3e' : '#dc3545' }}
          >
            ₹ {isProfit ? '' : '-'}
            {Math.abs(pnl).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Table.Td>

        <Table.Td>
          <Button
            size="sm"
            style={{ backgroundColor: 'black' }}
            onClick={() => {
              setSelectedStrategy(strategy);
              setOpened(true);
            }}
          >
            Details
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  })}
</Table.Tbody>
            </Table>
            </ScrollArea>
          </Box>
        </Container>

        <Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title={selectedStrategy?.strategy_name}
  size="lg"
  centered
>
  <ScrollArea>
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>S.No</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Multiplier</Table.Th>
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {selectedStrategy?.deployments?.map((dep, i) => (
          <Table.Tr key={dep.id}>
            <Table.Td>{i + 1}</Table.Td>
            <Table.Td>{dep.type}</Table.Td>
            <Table.Td>{dep.multiplier}</Table.Td>
            <Table.Td>
              {new Date(dep.deployed_at).toLocaleString('en-IN')}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </ScrollArea>
</Modal>
      </Box>
  )
}

export default Reports