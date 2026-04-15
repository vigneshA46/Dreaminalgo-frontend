import React, { useEffect, useState } from 'react';
import { useMarketWebSocket } from "../hooks/useMarketWebSocket";
import { io } from "socket.io-client";
import { useMediaQuery } from '@mantine/hooks';
import dayjs from "dayjs";

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
  ActionIcon,
  Menu,
  Divider,
  UnstyledButton,
  Avatar,
  ScrollArea,
  Modal
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
  IconFilter,
  IconBell,
  IconUser,
  IconInfoCircle,
  IconLogout,
  IconReceipt,
  IconWallet,
  IconKey,
  IconBook,
  IconBuildingBank,
  IconHelpCircle,
  IconCoinFilled
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

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
  const [totalPnl, setTotalPnl] = useState(0);
   const [active, setActive] = useState("live"); 
   const [user , setUser] = useState([]);
   const isMobile = useMediaQuery('(max-width: 768px)');
   const {logout } = useUser();
   const ltpData = useMarketWebSocket();
   const navigation = useNavigate()
   const [startergies , setstartergies] = useState([]);
   const [openedRow, setOpenedRow] = useState(null);
   const [legs, setLegs] = useState({});
   const [liveData, setLiveData] = useState({});
   const [dates, setDates] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [tradesModalOpen, setTradesModalOpen] = useState(false);
const [tradesData, setTradesData] = useState([]);
const [selectedLegInfo, setSelectedLegInfo] = useState(null);
const [todaydeployment , settodaydeployment] = useState([])
const [legPnls, setLegPnls] = useState({});
const [cumulativePnl, setCumulativePnl] = useState({});

useEffect(() => {
  let total = 0;

  Object.keys(liveData).forEach((id) => {
    const pnl = liveData[id]?.pnl;

    if (pnl !== undefined && pnl !== null) {
      total += Number(pnl);
    }
  });

  setTotalPnl(total);
}, [liveData]);
const [Livestock, setLivestock] = useState({
  NIFTY: null,
  BANKNIFTY: null,
  FINNIFTY: null,
  SENSEX: null,
  MIDCAP: null,
});


  useState(()=>{
    const fetchtodaydeployment = async () =>{
      const res = await apiRequest('GET','/api/deployments/user/today')
      await settodaydeployment(res)
      console.log(res)
    }

    fetchtodaydeployment();
  }, [])

  const deploymentMap = {};

todaydeployment.forEach((d) => {
  if (!deploymentMap[d.strategy_id]) {
    deploymentMap[d.strategy_id] = [];
  }
  deploymentMap[d.strategy_id].push(d.type);
});

  const deployedStrategyIds = new Set(
  todaydeployment.map(d => d.strategy_id)
)

const deployedStrategies = startergies.filter(strategy =>
  deployedStrategyIds.has(strategy.id)
)

   useEffect(() => {
  const socket = io("https://algoapi.dreamintraders.in");

  socket.on("connect", () => {
    console.log("✅ Connected:", socket.id);
    /* console.log("🔥 Live Data:", socket); */
  });

  socket.on("strategy_update", (incoming) => {
    /* console.log("🔥 Live Data:", incoming); */

    setLiveData((prev) => ({
      ...prev,
      [incoming.strategy_id]: incoming
    }));
    
    if (incoming.strategy_id === "123" && incoming.index && incoming.ltp) {
    setLivestock((prev) => ({
      ...prev,
      [incoming.index]: parseFloat(incoming.ltp),
    }));
  }
    /* console.log(incoming) */
    
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected");
  });

  return () => {
    socket.disconnect();
  };
}, []);

useEffect(()=>{
  const fetchuser = async ()=>{
    try{
      const res = await apiRequest('POST','/api/users/me')
      setUser(res)
    }catch(err){
      console.log(err)
    }  
  }
  fetchuser();
},[])

const handleRowToggle = async (strategyId) => {
  if (openedRow === strategyId) {
    setOpenedRow(null);
  } else {
    setOpenedRow(strategyId);

    // fetch dates when opening
    await fetchDates(strategyId);
  }
};


const fetchDates = async (strategyId) => {
  try {
    const res = await apiRequest(
      "GET",
      `/api/tradelegs/dates/${strategyId}`
    );

    const data = res;

    setDates((prev) => ({
      ...prev,
      [strategyId]: data.dates
    }));

    // set latest date as default
    if (data.dates.length > 0) {
      const latestDate = data.dates[0];

      setSelectedDate((prev) => ({
        ...prev,
        [strategyId]: latestDate
      }));

      // fetch legs for latest date
      fetchLegsByDate(strategyId, latestDate);
    }

  } catch (err) {
    console.error(err);
  }
};

const fetchLegsByDate = async (strategyId, date) => {
  try {
    const res = await apiRequest(
      "POST",
      `/api/tradelegs/stratergy/detailled/?strategy_id=${strategyId}&date=${date}`
    );

    const data = res;

    // ✅ LEGS
    setLegs((prev) => ({
      ...prev,
      [strategyId]: data.legs
    }));

    // ✅ LEG PNLs (IMPORTANT)
    setLegPnls((prev) => ({
      ...prev,
      [strategyId]: data.leg_pnls
    }));

    // ✅ CUMULATIVE PNL (IMPORTANT)
    setCumulativePnl((prev) => ({
      ...prev,
      [strategyId]: data.cumulative_pnl
    }));

  } catch (err) {
    console.error(err);
  }
};
const fetchTradesByToken = async (strategyId, date, token) => {
  try {
    console.log("date",date , "token", token, "strategy id", strategyId)
    const res = await apiRequest(
      "GET",
      `/api/paperlogger/event/by-token?date=${date}&token=${token}&strategy_id=${strategyId}`
    );
    setTradesData(res.data);
    console.log(res.data)
    setTradesModalOpen(true); 

  } catch (err) {
    console.error(err);
  }
};



const PaperUI = ()=>{

        

  return(
      <Box
  style={{
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    width: "100%",
  }}
>
  {/* Scrollable container */}
  <ScrollArea  w={isMobile? '100vw':'100%'}
  type="auto"
  scrollbarSize={6}
  offsetScrollbars>
            <Table
              w={isMobile? '100vw': '100%'}
              horizontalSpacing="md"
              verticalSpacing="md"
          /*     stickyHeader 
              stickyHeaderOffset={0} */
              style={{
                minWidth: '900px',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Strategy Name
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    O | T | M O
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Status
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    PNL
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Details
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
  {startergies.length > 0 ? (
    
    startergies.map((strategy, index) => {
      const isToday = selectedDate[strategy.id] === dayjs().format("YYYY-MM-DD");

      const displayPnl = liveData[strategy.id]?.pnl ? liveData[strategy.id]?.pnl
      : cumulativePnl[strategy.id];
      return(
      <React.Fragment key={strategy.id}>
    <Table.Tr>
      <Table.Td>{index + 1}</Table.Td>

      <Table.Td>{strategy.name}</Table.Td>

      <Table.Td>-</Table.Td>

      <Table.Td>
  {liveData[strategy.id]?.status || "CLOSED"}
</Table.Td>


    

<Table.Td
  style={{
    color: displayPnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 600
  }}
>
  {displayPnl ?? "-"}
</Table.Td>
      {/* ACTION COLUMN */}
      <Table.Td>
        <ActionIcon
          variant="subtle"
          onClick={() => handleRowToggle(strategy.id)}
        >
          {openedRow === strategy.id ? (
            <IconChevronUp size={18} />
          ) : (
            <IconChevronDown size={18} />
          )}
        </ActionIcon>
      </Table.Td>

      <Table.Td>-</Table.Td>
    </Table.Tr>

    {/* EXPANDED ROW */}
    {openedRow === strategy.id && (
      <>
      <Select
  label="Select Date"
  placeholder="Pick date"
  value={selectedDate[strategy.id] || null}
  data={(dates[strategy.id] || []).map((d) => ({
    value: d,
    label: d,
  }))}


  onChange={(value) => {
    setSelectedDate((prev) => ({
      ...prev,
      [strategy.id]: value,
    }));

    fetchLegsByDate(strategy.id, value);
  }}

  opened={dropdownOpened}
  onDropdownOpen={() => setDropdownOpened(true)}
  onDropdownClose={() => setDropdownOpened(false)}

  comboboxProps={{
  withinPortal: true,
  keepMounted: true
}}
  mb="md"
/>
  <Table.Tr>
    <Table.Td colSpan={7}>
      <Box  style={{ background: "#f8f9fa", borderRadius: "8px" }}>
        
        <Table
          horizontalSpacing="md"
          verticalSpacing="sm"
          style={{ width: "100%" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>QTY</Table.Th>
              <Table.Th>LTP ₹</Table.Th>
              <Table.Th>P&L ₹</Table.Th>
              <Table.Th>Val ₹</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
  {legs[strategy.id]?.length > 0 ? (
    legs[strategy.id].map((leg, i) => {

      const isToday = selectedDate[strategy.id] === dayjs().format("YYYY-MM-DD");
      
    const ltp = isToday
  ? (leg.leg === "CE"
      ? liveData[strategy.id]?.ce_ltp
      : liveData[strategy.id]?.pe_ltp)
  : "-"; // or store historical LTP if needed


    const pnl = isToday
  ? (leg.leg === "CE"
      ? liveData[strategy.id]?.ce_pnl
      : liveData[strategy.id]?.pe_pnl)
  : legPnls[strategy.id]?.[leg.token]?.pnl;

    const qty = 0;

    const val = qty * (ltp || 0);

      return (
        <Table.Tr key={leg.leg}>
          <Table.Td>{i + 1}</Table.Td>

          <Table.Td>
            <Text
    fw={500}
    style={{ cursor: "pointer", color: "#228be6" }}
    onClick={() => {

      const token = leg.token; // ✅ FIXED
      const date = selectedDate[strategy.id];

      setSelectedLegInfo({
        strategyId: strategy.id,
        token,
        date,
        leg: leg.leg
      });

      fetchTradesByToken(strategy.id, date, token);
    }}
  >
    {leg.symbol}
  </Text>
            <Text size="xs" c="dimmed">
              {leg.leg}
            </Text>
          </Table.Td>

          <Table.Td>{qty}</Table.Td>

<Table.Td>{ltp ?? "-"}</Table.Td>

<Table.Td
  style={{
    color: pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 500
  }}
>
  {pnl ?? "-"}
</Table.Td>

<Table.Td>{val.toFixed(2)}</Table.Td>
        </Table.Tr>
      );
    })
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={6}
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#868e96"
        }}
      >
        No Legs found
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
        </Table>
      </Box>
    </Table.Td>
  </Table.Tr>
  </>
)}
  </React.Fragment>
      )
})
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={7}
        style={{ textAlign: "center", padding: "60px", color: "#adb5bd" }}
      >
        <Text size="sm">No strategies available</Text>
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
            </Table>
            </ScrollArea>

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
  )
}


const LiveUI = ()=>{
  return(
      <Box
  style={{
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    width: "100%",
  }}
>
  {/* Scrollable container */}
  <ScrollArea  w={isMobile? '100vw':'100%'}
  type="auto"
  scrollbarSize={6}
  offsetScrollbars>
            <Table
              w={isMobile? '100vw': '100%'}
              horizontalSpacing="md"
              verticalSpacing="md"
          /*     stickyHeader 
              stickyHeaderOffset={0} */
              style={{
                minWidth: '900px',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Strategy Name
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    O | T | M O
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Status
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    PNL
                  </Table.Th>
                   <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Broker
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Details
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
  {deployedStrategies.length > 0 ? (
    deployedStrategies.map((strategy, index) => (
  <React.Fragment key={strategy.id}>
    <Table.Tr>
      <Table.Td>{index + 1}</Table.Td>

      <Table.Td>{strategy.name}</Table.Td>

      <Table.Td>-</Table.Td>

      <Table.Td>
  {liveData[strategy.id]?.status || "CLOSED"}
</Table.Td>

      <Table.Td
  style={{
    color: liveData[strategy.id]?.pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 600
  }}
>
  {liveData[strategy.id]?.pnl ?? "-"}
</Table.Td>
  <Table.Td>
  {deploymentMap[strategy.id]?.join(", ") || "-"}
</Table.Td>

      {/* ACTION COLUMN */}
      <Table.Td>
        <ActionIcon
          variant="subtle"
          onClick={() => handleRowToggle(strategy.id)}
        >
          {openedRow === strategy.id ? (
            <IconChevronUp size={18} />
          ) : (
            <IconChevronDown size={18} />
          )}
        </ActionIcon>
      </Table.Td>

      <Table.Td>-</Table.Td>
    </Table.Tr>

    {/* EXPANDED ROW */}
    {openedRow === strategy.id && (
      <>
      <Select
  label="Select Date"
  placeholder="Pick date"
  value={selectedDate[strategy.id] || null}
  data={(dates[strategy.id] || []).map((d) => ({
    value: d,
    label: d,
  }))}


  onChange={(value) => {
    setSelectedDate((prev) => ({
      ...prev,
      [strategy.id]: value,
    }));

    fetchLegsByDate(strategy.id, value);
  }}

  opened={dropdownOpened}
  onDropdownOpen={() => setDropdownOpened(true)}
  onDropdownClose={() => setDropdownOpened(false)}

  comboboxProps={{
  withinPortal: true,
  keepMounted: true
}}
  mb="md"
/>
  <Table.Tr>
    <Table.Td colSpan={7}>
      <Box  style={{ background: "#f8f9fa", borderRadius: "8px" }}>
        
        <Table
          horizontalSpacing="md"
          verticalSpacing="sm"
          style={{ width: "100%" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>QTY</Table.Th>
              <Table.Th>LTP ₹</Table.Th>
              <Table.Th>P&L ₹</Table.Th>
              <Table.Th>Val ₹</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
  {legs[strategy.id]?.length > 0 ? (
    legs[strategy.id].map((leg, i) => {
      
      const ltp =
  leg.leg === "CE"
    ? liveData[strategy.id]?.ce_ltp
    : liveData[strategy.id]?.pe_ltp;

    const pnl =
  leg.leg === "CE"
    ? liveData[strategy.id]?.ce_pnl
    : liveData[strategy.id]?.pe_pnl;

    const qty = 0;

    const val = qty * (ltp || 0);

      return (
        <Table.Tr key={leg.leg}>
          <Table.Td>{i + 1}</Table.Td>

          <Table.Td>
            <Text
    fw={500}
    style={{ cursor: "pointer", color: "#228be6" }}
    onClick={() => {

      const token = leg.token; // ✅ FIXED
      const date = selectedDate[strategy.id];

      setSelectedLegInfo({
        strategyId: strategy.id,
        token,
        date,
        leg: leg.leg
      });

      fetchTradesByToken(strategy.id, date, token);
    }}
  >
    {leg.symbol}
  </Text>
            <Text size="xs" c="dimmed">
              {leg.leg}
            </Text>
          </Table.Td>

          <Table.Td>{qty}</Table.Td>

<Table.Td>{ltp ?? "-"}</Table.Td>

<Table.Td
  style={{
    color: pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 500
  }}
>
  {pnl ?? "-"}
</Table.Td>

<Table.Td>{val.toFixed(2)}</Table.Td>
        </Table.Tr>
      );
    })
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={6}
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#868e96"
        }}
      >
        No Legs found
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
        </Table>
      </Box>
    </Table.Td>
  </Table.Tr>
  </>
)}
  </React.Fragment>
))
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={7}
        style={{ textAlign: "center", padding: "60px", color: "#adb5bd" }}
      >
        <Text size="sm">No strategies available</Text>
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
            </Table>
            </ScrollArea>

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
  )
}



useEffect(()=>{
      const Fetchstartergies = async ()=>{
        try {
          const response = await apiRequest('GET','/api/stratergy')
          await setstartergies(response)
          console.log(response)
        }catch(err){
          console.log(err)
        }
      }
      Fetchstartergies();
     },[])

     const indices = [
    { name: "NIFTY", label: "NIFTY50" },
    { name: "BANKNIFTY", label: "BANKNIFTY" },
    { name: "FINNIFTY", label: "FINNIFTY" },
    { name: "SENSEX", label: "SENSEX" },
    { name: "MIDCAP", label: "MIDCAP" },
  ];

  return (
    <Box>
      {/* Header */}
      <Flex align={'center'} justify="space-between" mb="xl">
        <Box>
          <Text size="1.3rem" fw={600}>
            Welcome back, {user.fullname}!
          </Text>
          <Text size="sm" color="dimmed" mt={4}>
            Track your algorithmic trading performance
          </Text>
        </Box>
<Flex gap="2rem" align="center" justify="center">
    <Flex
      align="center"
      style={{
        background: '#ffffff',
        borderRadius: '999px',
        padding: '4px',
        width: 'fit-content',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      }}
    >
      {/* Left Icon Section */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: '50%',
          width: 36,
          height: 36,
          border: '2px solid #ffffff',
        }}
      >
        <IconCoinFilled size={44} color="#FFD900" />
      </Box>

      {/* Right Curved Text Section */}
      <Text
        ml={10}
        mr={14}
        fw={600}
        size="md"
        c="#000"
        style={{
          letterSpacing: '0.5px',
        }}
      >
        {user.tokens} TOKENS
      </Text>
    </Flex>
  {/* 🔔 Notification icon */}
  <Menu width={310} position="bottom-end" shadow="md">
    <Menu.Target>
      <UnstyledButton>
        <IconBell size={22} />
      </UnstyledButton>
    </Menu.Target>

    <Menu.Dropdown>
      <Text fw={600} p="sm">Notifications</Text>
      <Divider />

      <Box p="sm">
        <Text size="sm" fw={500}>Order Completed</Text>
        <Text size="xs" c="dimmed">02 Dec 2025 • 11:45 AM</Text>
      </Box>
      <Divider />

      <Box p="sm">
        <Text size="sm" fw={500}>Subscription Expiring Soon</Text>
        <Text size="xs" c="dimmed">01 Dec 2025 • 3:12 PM</Text>
      </Box>

      <Divider />
      <Menu.Item>View all</Menu.Item>
    </Menu.Dropdown>
  </Menu>

  {/* 👤 Profile icon */}
  <Menu width={260} position="bottom-end" shadow="md">
    <Menu.Target>
      <UnstyledButton>
        <Box
          style={{
            border: "2px solid #000",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconUser size={20} />
        </Box>
      </UnstyledButton>
    </Menu.Target>

 <Menu.Dropdown>
  {/* User Section */}
  <Group wrap="nowrap" p="md">
    <Avatar radius="xl" color="black">V</Avatar>
    <div>
      <Text fw={600}>{user.fullname}</Text>
      <Text size="sm" c="dimmed">{user.email}</Text>
    </div>
  </Group>

  <Divider />

  {/* About */}
  <Menu.Item onClick={()=>navigation('/about')} leftSection={<IconInfoCircle size={18} />}>
    About
  </Menu.Item>

  {/* New Sections from Screenshot */}
  <Menu.Item onClick={()=>navigation('/broker')} leftSection={<IconBook size={18} />}>
    Broker & Exchanges
  </Menu.Item>

  <Menu.Item leftSection={<IconWallet size={18} />}>
    Wallet
  </Menu.Item>

    <Menu.Item onClick={()=>navigation('/demat')} leftSection={<IconBuildingBank size={18} />}>
    Demat Account
  </Menu.Item>

  <Menu.Item leftSection={<IconReceipt size={18} />}>
    Invoices
  </Menu.Item>

    <Menu.Item onClick={()=>navigation('/privacy')} leftSection={<IconHelpCircle size={18} />}>
    Privacy Policy
  </Menu.Item>

  <Menu.Item onClick={()=>navigation('/terms')} leftSection={<IconHelpCircle size={18} />}>
     Terms and Conditions
  </Menu.Item>

  <Menu.Item onClick={()=>navigation('/changepassword')} leftSection={<IconKey size={18} />}>
    Change Password
  </Menu.Item>

  <Divider />

  {/* Logout should stay last */}
  <Menu.Item onClick={()=>{logout()}} color="red" leftSection={<IconLogout size={18} />}>
    Log Out
  </Menu.Item>
</Menu.Dropdown>

  </Menu>

</Flex>

</Flex>
   {/*    <Grid gutter="lg" mb="xl">
      {indices.map((item) => (
        <Grid.Col span="auto" key={item.name}>
          <Stack
            style={{
              border: "1.5px solid #d6d6d6ff",
              borderLeft: "3px solid #2563eb",
              padding: "0.5rem",
              borderRadius: "0.3rem",
              background: "#fff",
              minWidth: "140px",
            }}
          >
            <Text fw={600}>{item.label}</Text>

            <Flex gap="0.4rem">
              <Text size="0.9rem" fw={600}>
                {Livestock[item.name] ?? "-"}
              </Text>
            </Flex>
          </Stack>
        </Grid.Col>
      ))}
    </Grid>
 */}
<Grid gutter="lg"  mb="xl">
  <Grid.Col   span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
    <StatCard
      icon={IconCurrencyDollar}
      title="Portfolio Value"
      value="₹125,847"
      change="+28.5% total return"
    />
  </Grid.Col>

  <Grid.Col span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
    <StatCard
      icon={IconActivity}
      title="Active Strategies"
      value="3"
      subtitle="8 total created"
    />
  </Grid.Col>

  <Grid.Col span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
    <StatCard
      icon={IconChartBar}
      title="Total Trades"
      value="73"
      subtitle="48 wins, 25 losses"
    />
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
              <Group gap="2rem" wrap='true' > 
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
                    
                    <span
      style={{
        color: totalPnl >= 0 ? "#16a34a" : "#dc2626",
        fontWeight:500
      }}
    >
      ₹ {totalPnl.toFixed(2) || 0} 
    </span>
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
      {
          active== 'live' ?  <Button bg={"#000"} radius={"0.5rem"} > Exit all</Button> : <> </>
      }
    </Group>
            </Group>
          </Box>

          {/* Table Container */}
          {
            active == 'pt' ? (
              <>
              <PaperUI />
              </>
            ) : (
              <><LiveUI /></>
            )
          }
        </Box>


    {/* 
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
      <Modal
  opened={tradesModalOpen}
  onClose={() => setTradesModalOpen(false)}
  title={`Trades - ${selectedLegInfo?.leg || ""}`}
  size="xl"
>
  <ScrollArea h={400}>
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Side</Table.Th>
          <Table.Th>Timestamp</Table.Th>
          <Table.Th>event_type</Table.Th>
          <Table.Th>symbol</Table.Th>
          <Table.Th>Qty</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>PnL</Table.Th>
          <Table.Th>Cum PnL</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {tradesData.length > 0 ? (
          tradesData.map((trade, i) => (
            <Table.Tr key={trade.id}>
              <Table.Td>{i + 1}</Table.Td>

              <Table.Td>{trade.leg_name}</Table.Td>

              <Table.Td>
            {new Date(trade.timestamp).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            })}
            </Table.Td>

              <Table.Td>{trade.event_type}</Table.Td>

              <Table.Td>{trade.symbol}</Table.Td>
              <Table.Td>{trade.quantity}</Table.Td>
              <Table.Td>{trade.price}</Table.Td>
              <Table.Td
                style={{
                  color:
                    parseFloat(trade.pnl) >= 0
                      ? "#16a34a"
                      : "#dc2626",
                  fontWeight: 500
                }}
              >
                {parseFloat(trade.pnl).toFixed(2)}
              </Table.Td>
              <Table.Td
                style={{
                  color:
                    parseFloat(trade.cum_pnl) >= 0
                      ? "#16a34a"
                      : "#dc2626",
                  fontWeight: 500
                }}
              >
                {parseFloat(trade.cum_pnl).toFixed(2)}
              </Table.Td>

            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={7} style={{ textAlign: "center" }}>
              No trades found
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  </ScrollArea>
</Modal>
     </Box>
  );
}