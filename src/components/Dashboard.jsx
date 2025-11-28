import React from 'react';
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
  Stack
} from '@mantine/core';
import { 
  IconCurrencyDollar, 
  IconActivity, 
  IconChartBar,
  IconAlertTriangle,
  IconArrowUpRight,
  IconSettings,
  IconPlus
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
      
      <Text size="xl" weight={700} mt="xs">
        {value}
      </Text>
      {subtitle && (
        <Text size="xs" color="dimmed" mt={4}>
          {subtitle}
        </Text>
      )}
      {change && (
        <Group spacing={4} mt="xs">
          <IconArrowUpRight size={16} color="#10b981" />
          <Text size="sm" color="#10b981" weight={600}>
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
      <SimpleGrid
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
    </SimpleGrid>

      {/* Stats Grid */}
      <SimpleGrid
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
      </SimpleGrid>

      {/* Main Content Grid */}
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 1, spacing: 'md' },
        ]}
      >
        {/* Portfolio Performance Chart */}
        <Paper
          p="lg"
          radius="md"
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
          }}
        >
          <Text size="lg" weight={600} mb="xs">
            Portfolio Performance
          </Text>
          <Text size="sm" color="dimmed" mb="xl">
            6-month trend
          </Text>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>

        {/* AI Risk Insights */}
        <Paper
          p="lg"
          radius="md"
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
          }}
        >
          <Text size="lg" weight={600} mb="xs">
            AI Risk Insights
          </Text>
          <Text size="sm" color="dimmed" mb="lg">
            Real-time risk analysis
          </Text>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <RiskCard
              title="Market Volatility"
              description="Currently low - good for momentum strategies"
              level="LOW"
              color="green"
            />
            <RiskCard
              title="Correlation Risk"
              description="Multiple strategies targeting similar assets"
              level="MEDIUM"
              color="yellow"
            />
            <RiskCard
              title="Liquidity Analysis"
              description="All positions have adequate exit liquidity"
              level="GOOD"
              color="blue"
            />
          </Box>
        </Paper>
      </SimpleGrid>
    </Box>
  );
}