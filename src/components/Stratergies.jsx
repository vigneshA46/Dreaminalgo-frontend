import React, { useEffect, useState } from 'react';
import { MantineProvider, Box, Container, Group, Button, TextInput, Radio, Text, Card, Badge, Anchor, Grid, Stack } from '@mantine/core';
import { IconSearch, IconCurrencyRupee } from '@tabler/icons-react';
import { apiRequest } from '../utils/api';
import DeployStrategyModal from './atoms/DeployStrategyModal';


const Stratergies = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedFee, setSelectedFee] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [strategies , setstrategies] = useState([])
  const [mystartergieslist , setmystartergieslist] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [strategyid , setstrategyid] = useState('')
  const [todaydeployment , settodaydeployment] = useState([])

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
  setExpanded((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};
  const [search, setSearch] = useState("");

  const isTimeExceeded = (starting_time) => {
  if (!starting_time) return false;

  const now = new Date();

  // Convert to IST
  const istNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const [hours, minutes, seconds] = starting_time.split(":").map(Number);

  const startTimeToday = new Date(istNow);
  startTimeToday.setHours(hours, minutes, seconds || 0, 0);

  return istNow > startTimeToday;
};

  useState(()=>{
    const fetchtodaydeployment = async () =>{
      const res = await apiRequest('GET','/api/deployments/user/today')
      await settodaydeployment(res)
      console.log(res)
    }

    fetchtodaydeployment();
  }, [])

  const deployedStrategyIds = new Set(
  todaydeployment.map(d => d.strategy_id)
)

  const openModal = (strategyName,strategy_id) => {
    setSelectedStrategy(strategyName);
    setstrategyid(strategy_id)
    setOpened(true);
  };

  const filteredStrategies = strategies.filter((strategy) => {
  if (!search) return true;

  const query = search.toLowerCase();

  return (
    strategy.state_id?.toString().toLowerCase().includes(query) ||
    strategy.name?.toLowerCase().includes(query) ||
    strategy.description?.toLowerCase().includes(query)
  );
});
  const SingleTraderSignal = ({
    startergyname,
    timestamp,
    description,
    onDeploy,
    onView,
    strategyid
  }) => {
    return (
      <Card
        radius="md"
        withBorder
        p="lg"
        style={{
          borderColor: "#e5e5e5",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Content */}
        <Stack gap={6}>
          <Text fw={600} size="md">
            {startergyname}
          </Text>
  
          <Text size="xs" c="dimmed">
            {timestamp}
          </Text>
  
          <Text size="sm" c="black">
            {description}
          </Text>
        </Stack>
  
        {/* Buttons */}
        <Group mt="lg" grow px={"1rem"}>
          <Button
          radius={"0.4rem"}
            styles={{
              root: {
                border:"1px solid #a0a0a0",
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
            onClick={onView}
          >
            View
          </Button>
          <Button
            disabled={deployedStrategyIds.has(strategyid)}

          radius={"0.4rem"}
            
            style={{
              borderColor:'#000',
                  backgroundColor: deployedStrategyIds.has(strategyid) ? '#dbdbdb' : '#000000',
                color: deployedStrategyIds.has(strategyid) ? '#000000' : '#ffffff',
            }}  
            
              onClick={() => openModal(startergyname, strategyid)}

          >
            {deployedStrategyIds.has(strategyid) ? "DEPLOYED" : "DEPLOY"}
          </Button>
        </Group>
      </Card>
    );
  };

      const fetchStratergy = async ()=>{
      try {
        const strategies = await apiRequest("GET","/api/stratergy")
        /* console.log(strategies) */
        await setstrategies(strategies.strategies)
      }
      catch(err){
        console.log(err)
      }
    }

    const fetmystartergies = async () =>{
      try {
        const strategies = await apiRequest("POST","/api/createstartergy/user/userid")
        console.log(strategies)
        setmystartergieslist(strategies);
      }
      catch(err){
        console.log(err)
      }
    }
  
  useEffect(()=>{
    fetchStratergy();
    fetmystartergies();
  },[])

  
  return (
     <Box style={{ backgroundColor: '#ffffffff', minHeight: '100vh' }}>
        <Container size="xl" style={{ maxWidth: '1400px' }}>
      <Text size='1.5rem' fw={"600"} pb={"1rem"} >Stratergies</Text>
          {/* Tabs */}
          <Group gap="md" justify="space-between" mb="xl">
            <Group>
            <Button
              size="md"
              radius="xl"
              style={{
                backgroundColor: activeTab === 'marketplace' ? '#000000ff' : 'transparent',
                color: activeTab === 'marketplace' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('marketplace')}
            >
              Marketplace
            </Button>
            <Button
              size="md"
              radius="xl"
              variant="subtle"
              style={{
                backgroundColor: activeTab === 'myStrategies' ? '#000000ff' : 'transparent',
                color: activeTab === 'myStrategies' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('myStrategies')}
            >
              My Strategies
            </Button>
            </Group>
                            <TextInput
  placeholder="Search by State ID"
  value={search}
  onChange={(e) => setSearch(e.currentTarget.value)}
  leftSection={<IconSearch size={18} />}
  radius="md"
  mb="xl"
/>
          </Group>
          {
            activeTab == 'marketplace' ? (
<Stack>
            
              {filteredStrategies.map((strategy) => (
                <Card
                  key={strategy.id}
                  shadow="sm"
                  padding="xl"
                  radius="md"
                  mb="lg"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Group justify="space-between" align="flex-start" mb="md">
                    <Box style={{ flex: 1 }}>
                      <Text size="lg" fw={600} c="#212529" mb={8}>
                        {strategy.name} - {strategy.state_id}
                      </Text>
                      <Text size="sm" c="#495057" mb={8}>
  {expanded[strategy.id]
    ? strategy.description
    : `${strategy.description.slice(0, 120)}${
        strategy.description.length > 120 ? "..." : ""
      }`}

  {strategy.description.length > 120 && (
    <Anchor
      component="button"
      size="sm"
      ml={4}
      onClick={() => toggleExpand(strategy.id)}
      style={{ color: '#1864ab' }}
    >
      {expanded[strategy.id] ? "Show less" : "Read more"}
    </Anchor>
  )}
</Text>
                    </Box>
                  </Group>

                  <Group justify="space-between" align="center">
                    <Group gap="xl">
                      <Box>
                        <Text size="xs" c="#868e96" mb={4}>
                          Capital
                        </Text>
                        <Group gap={4} align="center">
                          <IconCurrencyRupee size={18} color="#dc3545" stroke={2} />
                          <Text size="lg" fw={700} c="#dc3545">
                            {strategy.capital_required}
                          </Text>
                        </Group>
                      </Box>
                    
                    </Group>

                    <Button
  size="md"
  radius="md"
  variant="outline"
  disabled={
    deployedStrategyIds.has(strategy.id) ||
    isTimeExceeded(strategy.starting_time)
  }
  onClick={() => openModal(strategy.name, strategy.id)}
  style={{
    borderColor:
      deployedStrategyIds.has(strategy.id) ||
      isTimeExceeded(strategy.starting_time)
        ? '#adb5bd'
        : '#dc3545',
    color:
      deployedStrategyIds.has(strategy.id) ||
      isTimeExceeded(strategy.starting_time)
        ? '#adb5bd'
        : '#dc3545',
    fontWeight: 600,
    paddingLeft: '32px',
    paddingRight: '32px',
  }}
>
  {deployedStrategyIds.has(strategy.id)
    ? "DEPLOYED"
    : isTimeExceeded(strategy.starting_time)
    ? "TIME OVER"
    : "DEPLOY"}
</Button>
                  </Group>
                </Card> 
              ))}

</Stack>

            ) : (
              <Grid>
                    {mystartergieslist.map((signal) => (
                      <Grid.Col
                        key={signal.id}
                        span={{ base: 12, sm: 6, md: 4, lg: 6 }}
                      >
                        <SingleTraderSignal
                          startergyname={signal.startergy_name}
                          description={signal.description}
                          timestamp={signal.created_at}
                          strategyid={signal.id}
                          onView={() => console.log("view", signal.id)}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
            )
          }

        
        </Container>
        <DeployStrategyModal
        opened={opened}
        onClose={() => setOpened(false)}
        strategyName={selectedStrategy}
        strategy_id={strategyid}
      />
      </Box>
  )
}

export default Stratergies