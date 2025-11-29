import React, { useState } from 'react';
import { 
  Box, 
  Text, 
  Group, 
  SimpleGrid, 
  Paper,
  Badge,
  Button,
  ThemeIcon,
  Flex,
  Center,
  Stack,
  Grid,
  Table,
  Pagination,
  Container,
  Select,
  ActionIcon
} from '@mantine/core';
import { 
  IconCurrencyDollar, 
  IconActivity, 
  IconChartBar,
  IconAlertTriangle,
  IconArrowUpRight,
  IconSettings,
  IconPlus,
  IconCurrencyRupee,
  IconFilter
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Static data for portfolio performance
const portfolioData = [
  { month: 'May', value: 10000 },
  { month: 'Jun', value: 10500 },
  { month: 'Jul', value: 10400 },
  { month: 'Aug', value: 11000 },
  { month: 'Sep', value: 11500 },
  { month: 'Oct', value: 12200 },
  { month: 'Nov', value: 13000 },
  { month: 'Dec', value: 12847 },
];

const StockUi = (market , price , pnl ) =>{
   <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: pnl >= 0 ? "3px solid #10b981" : "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>{market}</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={pnl >= 0 ? "green" : "red"} fw={600}>
          {price}
        </Text>
        <Text size="0.8rem" fw={600}>
          {pnl > 0 ? `+${pnl}` : pnl}
        </Text>
      </Flex>
    </Stack>
  
};

const stocks = [
  { market: "NIFTY50", price: 22333.2, pnl: -12.34 },
  { market: "BANKNIFTY", price: 48754.6, pnl: +54.12 },
  { market: "FINNIFTY", price: 19640.5, pnl: -4.22 },
  { market: "SENSEX", price: 73120.8, pnl: +102.88 },
  { market: "MIDCAP", price: 13245.7, pnl: +19.10 },
];

function StatCard({ icon: Icon, title, value, subtitle, change }) {
  return (
    <Paper
      p="md"
      radius="md"
      style={{
        border : '1.5px solid #d6d6d6ff',
        borderRadius : '10px'
      }}
      sx={{
        backgroundColor: '#fff',
        border: '1px solid #000',
        height: '100%',
      }}
    >
        <Flex align="center" gap="1rem" >
        <Group position="apart" mb="xs">
        <ThemeIcon size="lg" variant="light" color="gray">
          <Icon size={20} stroke={1.5} />
        </ThemeIcon>
      </Group>
      <Text size="sm" color="dimmed" weight={500}>
        {title}
      </Text>
        </Flex>
      
      <Text size="xl" weight={700}>
        {value}
      </Text>
      {subtitle && (
        <Text size="xs" color="dimmed" mt={4}>
          {subtitle}
        </Text>
      )}
      {change && (
        <Group spacing={4} mt={4}>
          <IconArrowUpRight size={12} color="#10b981" />
          <Text size="xs" color="#10b981" weight={600}>
            {change}
          </Text>
        </Group>
      )}
    </Paper>
  );
}

function RiskCard({ title, description, level, color }) {
  return (
    <Paper
      p="md"
      radius="md"
      sx={{
        backgroundColor: color === 'green' ? '#f0fdf4' : color === 'yellow' ? '#fefce8' : '#f0f9ff',
        border: `1px solid ${color === 'green' ? '#86efac' : color === 'yellow' ? '#fde047' : '#93c5fd'}`,
      }}
    >
      <Group position="apart" mb="xs">
        <Text size="sm" weight={600}>
          {title}
        </Text>
        <Badge
          size="sm"
          variant="filled"
          color={color === 'green' ? 'teal' : color === 'yellow' ? 'yellow' : 'blue'}
        >
          {level}
        </Badge>
      </Group>
      <Text size="xs" color="dimmed">
        {description}
      </Text>
    </Paper>
  );
}

export default function Dashboard() {
   const [active, setActive] = useState("live"); 
  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" mb="xl">
        <Box>
          <Text size="1.3rem" fw={600}>
            Welcome back, Vignesh!
          </Text>
          <Text size="sm" color="dimmed" mt={4}>
            Track your algorithmic trading performance
          </Text>
        </Box>
      </Flex>
      <Grid gutter="lg" mb="xl">
  {[
    { name: "NIFTY50", price: 22333.2, change: "-12.34", color: "red" },
    { name: "BANKNIFTY", price: 48754.6, change: "+44", color: "red" },
    { name: "FINNIFTY", price: 48754.6, change: "+44", color: "green" },
    { name: "SENSEX", price: 19640.5, change: "+44", color: "green" },
    { name: "MIDCAP", price: 73120.8, change: "+44", color: "red" },
  ].map((item) => (
    <Grid.Col span="auto" key={item.name} /* xs={12} sm={6} md={4} lg={3} xl={2} */>
      <Stack
        style={{
          border: "1.5px solid #d6d6d6ff",
          borderLeft: `3px solid ${item.color}`,
          padding: "0.5rem",
          borderRadius: "0.3rem",
          background: "#fff",
          minWidth: "140px",
        }}
      >
        <Text fw={600}>{item.name}</Text>
        <Flex gap="0.4rem">
          <Text size="0.8rem" c={item.color} fw={600}>
            {item.price}
          </Text>
          <Text size="0.8rem" fw={600}>
            {item.change}
          </Text>
        </Flex>
      </Stack>
    </Grid.Col>
  ))}
</Grid>

<Grid gutter="lg" mb="xl">
  <Grid.Col  span={3}>
    <StatCard
      icon={IconCurrencyDollar}
      title="Portfolio Value"
      value="₹125,847"
      change="+28.5% total return"
    />
  </Grid.Col>

  <Grid.Col span={3}>
    <StatCard
      icon={IconActivity}
      title="Active Strategies"
      value="3"
      subtitle="8 total created"
    />
  </Grid.Col>

  <Grid.Col span={3}>
    <StatCard
      icon={IconChartBar}
      title="Total Trades"
      value="73"
      subtitle="48 wins, 25 losses"
    />
  </Grid.Col>

  <Grid.Col span={3}>
    <Paper
      p="md"
      radius="md"
      style={{ border: "1.5px solid #d6d6d6ff", borderRadius: "10px" }}
    >
      <Flex align="center" gap="1rem">
        <ThemeIcon size="lg" variant="light" color="gray">
          <IconAlertTriangle size={20} stroke={1.5} />
        </ThemeIcon>
        <Text size="sm" color="dimmed" fw={500}>
          Risk Score
        </Text>
      </Flex>

      <Text size="xl" fw={700} mt="xs" color="orange">
        Medium
      </Text>
      <Text size="xs" color="dimmed" mt={4}>
        Portfolio diversity: 85%
      </Text>
    </Paper>
  </Grid.Col>
</Grid>
        <Box style={{ maxWidth: '100%' }}>
          {/* Top Bar */}
          <Box
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              marginBottom: '20px',
              
            }}
          >
            <Group justify="space-between" align="center">
              <Group gap="md">
                <Box
                  style={{
                    backgroundColor: '#000000ff',
                    borderRadius: '8px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCurrencyRupee size={28} color="white" stroke={2.5} />
                </Box>
                
                <Select
                  value="Expiry"
                  data={['Expiry','Today']}
                  styles={{
                    input: {
                      border: 'none',
                      backgroundColor: '#f1f3f5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 500,
                      minWidth: '120px',
                    },
                  }}
                />

                <Box>
                  <Text size="xs" c="dimmed" fw={500}>PNL</Text>
                  <Group gap={4}>
                    
                    <Text size="md" fw={600}>₹0</Text>
                  </Group>
                </Box>

                <Box>
                  <Text size="xs" c="dimmed" fw={500}>Capital</Text>
                  <Text size="md" fw={600}>0</Text>
                </Box>
              </Group>

 <Group gap="sm">
      {/* PT Button */}
      <Button
        variant="subtle"
        onClick={() => setActive("pt")}
        style={{
          backgroundColor: active === "pt" ? "#000" : "#fff",
          color: active === "pt" ? "#fff" : "#000",
          border: "1px solid #e9ecef",
          borderRadius: "8px",
          fontWeight: 500,
          paddingInline: "32px",
        }}
      >
        PT
      </Button>

      {/* Live Button */}
      <Button
        onClick={() => setActive("live")}
        style={{
          backgroundColor: active === "live" ? "#000" : "#fff",
          color: active === "live" ? "#fff" : "#000",
          borderRadius: "8px",
          fontWeight: 500,
          paddingInline: "32px",
          border: "1px solid #e9ecef",
        }}
      >
        Live
      </Button>

      <ActionIcon variant="subtle" size="lg" style={{ color: "#495057" }}>
        <IconFilter size={20} />
      </ActionIcon>
    </Group>
            </Group>
          </Box>

          {/* Table Container */}
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
              verticalSpacing="md"
              style={{
                minWidth: '100%',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Strategy Name
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    O | T | M O
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Status
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    PNL
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Broker
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Actions
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Details
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                    <Text size="sm">No strategies available</Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            {/* Pagination */}
            <Group justify="flex-end" mt="xl">
              <Pagination
                total={1}
                value={1}
                onChange={() => {}}
                size="sm"
                styles={{
                  control: {
                    border: '1px solid #000',
                    borderRadius: '6px',
                    '&[data-active]': {
                      backgroundColor: '#000',
                      borderColor: '#000',
                    },
                  },
                }}
              />
            </Group>
          </Box>
        </Box>


{/*       <SimpleGrid
        cols={5}
        spacing="lg"
        mb="xl"
        breakpoints={[
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        ]}
      >
     <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>NIFTY50</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"red"} fw={600}>
          22333.2
        </Text>
        <Text size="0.8rem" fw={600}>
          -12.34 
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>BANKNIFTY</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"red"} fw={600}>
         48754.6
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid green",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>FINNIFTY</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"green"} fw={600}>
          48754.6
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid green",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>SENSEX</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"green"} fw={600}>
          19640.5
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text >MIDCAP</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"red"} fw={600}>
          73120.8
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
    </SimpleGrid> */}

      {/* Stats Grid */}
{/*       <SimpleGrid
        cols={4}
        spacing="lg"
        mb="xl"
        breakpoints={[
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        ]}
      >
        <StatCard
          icon={IconCurrencyDollar}
          title="Portfolio Value"
          value="₹125,847"
          change="+28.5% total return"
        />
        <StatCard
          icon={IconActivity}
          title="Active Strategies"
          value="3"
          subtitle="8 total created"
        />
        <StatCard
          icon={IconChartBar}
          title="Total Trades"
          value="73"
          subtitle="48 wins, 25 losses"
        />
        <Paper
          p="md"
          radius="md"
           style={{
        border : '1.5px solid #d6d6d6ff',
        borderRadius : '10px'
      }}
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            height: '100%',
          }}
        >
            <Flex align="center" gap="1rem" >
          <Group position="apart" mb="xs">
            <ThemeIcon size="lg" variant="light" color="gray">
              <IconAlertTriangle size={20} stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text size="sm" color="dimmed" weight={500}>
            Risk Score
          </Text>
          </Flex>
          <Text size="xl" weight={700} mt="xs" color="orange">
            Medium
          </Text>
          <Text size="xs" color="dimmed" mt={4}>
            Portfolio diversity: 85%
          </Text>
        </Paper>
      </SimpleGrid> */}

      {/* Main Content Grid */}
     </Box>
  );
}