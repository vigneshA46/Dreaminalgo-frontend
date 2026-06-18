import React, { useEffect, useState } from 'react';
import { Box, Container, Group, Button, TextInput, Text, Card, Anchor, Grid, Stack, SimpleGrid } from '@mantine/core';
import { IconSearch, IconCurrencyRupee, IconLayersIntersect, IconTrendingUp, IconClock, IconFolder } from '@tabler/icons-react';
import { apiRequest } from '../utils/api';
import DeployStrategyModal from './atoms/DeployStrategyModal';

const Stratergies = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedFee, setSelectedFee] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [strategies, setstrategies] = useState([]);
  const [mystartergieslist, setmystartergieslist] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [strategyid, setstrategyid] = useState('');
  const [todaydeployment, settodaydeployment] = useState([]);

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
    const istNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const [hours, minutes, seconds] = starting_time.split(":").map(Number);

    const startTimeToday = new Date(istNow);
    startTimeToday.setHours(hours, minutes, seconds || 0, 0);

    return istNow > startTimeToday;
  };

  useEffect(() => {
    const fetchtodaydeployment = async () => {
      const res = await apiRequest('GET', '/api/deployments/user/today');
      await settodaydeployment(res);
    };

    fetchtodaydeployment();
  }, []);

  const deployedStrategyIds = new Set(
    todaydeployment.map(d => d.strategy_id)
  );

  const openModal = (strategyName, strategy_id) => {
    setSelectedStrategy(strategyName);
    setstrategyid(strategy_id);
    setOpened(true);
  };

  const filteredStrategies = strategies.filter((strategy) => {
    if (!search) return true;

    const query = search.toLowerCase();

    return (
      strategy.state_id?.toString().toLowerCase().includes(query) ||
      strategy.name?.toLowerCase().includes(query) ||
      strategy.description?.toLowerCase().includes(query) ||
      strategy.category?.toLowerCase().includes(query)
    );
  });

  // Helper function to group flat arrays by category key
  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      const categoryName = item.category || "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(item);
      return acc;
    }, {});
  };

  const groupedMarketplaceStrategies = groupByCategory(filteredStrategies);

  const SingleTraderSignal = ({
    startergyname,
    timestamp,
    description,
    onDeploy,
    onView,
    strategyid
  }) => {
    const isDeployed = deployedStrategyIds.has(strategyid);

    return (
      <Card
        radius="lg"
        withBorder
        p="xl"
        style={{
          borderColor: "#eef2f6",
          backgroundColor: "#ffffff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.02)";
        }}
      >
        <Stack gap="md" style={{ flexGrow: 1 }}>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Text fw={600} size="lg" c="#1a1b1e" style={{ lineHeight: 1.3 }}>
              {startergyname}
            </Text>
            <IconLayersIntersect size={22} color="#adb5bd" stroke={1.5} />
          </Group>

          <Text size="xs" fw={500} c="dimmed" style={{ letterSpacing: "0.5px" }}>
            {timestamp ? new Date(timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
          </Text>

          <Text size="sm" c="#495057" style={{ lineHeight: 1.6 }}>
            {description}
          </Text>
        </Stack>

        <Group mt="xl" gap="sm">
          <Button
            radius="md"
            variant="unstyled"
            style={{
              flex: 1,
              height: "44px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              color: "#1a1b1e",
              fontWeight: 600,
              fontSize: "14px",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
            onClick={onView}
          >
            View Details
          </Button>

          <Button
            disabled={isDeployed}
            radius="md"
            style={{
              flex: 1,
              height: "44px",
              border: "none",
              backgroundColor: isDeployed ? "#f1f3f5" : "#000000",
              color: isDeployed ? "#868e96" : "#ffffff",
              fontWeight: 600,
              fontSize: "14px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { if (!isDeployed) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { if (!isDeployed) e.currentTarget.style.opacity = "1"; }}
            onClick={() => openModal(startergyname, strategyid)}
          >
            {isDeployed ? "DEPLOYED" : "DEPLOY"}
          </Button>
        </Group>
      </Card>
    );
  };

  const fetchStratergy = async () => {
    try {
      const strategies = await apiRequest("GET", "/api/stratergy");
      await setstrategies(strategies.strategies);
    }
    catch (err) {
      console.log(err);
    }
  };

  const fetmystartergies = async () => {
    try {
      const strategies = await apiRequest("POST", "/api/createstartergy/user/userid");
      setmystartergieslist(strategies);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStratergy();
    fetmystartergies();
  }, []);

  const isCurrentTimeBetween = (startTime, endTime) => {
    if (!startTime || !endTime) return false;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    return (
      currentMinutes >= startMinutes &&
      currentMinutes <= endMinutes
    );
  };

  return (
    <Box style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
      <Container size="xl" style={{ maxWidth: '1400px' }}>

        {/* Header Block */}
        <Group justify="space-between" align="center" mb="30px">
          <Box>
            <Text size="2rem" fw={700} c="#000000" style={{ letterSpacing: '-0.5px' }}>
              Strategies
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              Deploy and manage automated financial trading frameworks.
            </Text>
          </Box>
        </Group>

        {/* Dynamic Controls Bar */}
        <Card radius="lg" p="md" withBorder mb="40px" style={{ borderColor: '#eef2f6', boxShadow: '0 2px 12px rgba(0,0,0,0.01)' }}>
          <Grid align="center" gutter="md">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Group gap="xs">
                <Button
                  size="sm"
                  radius="md"
                  style={{
                    backgroundColor: activeTab === 'marketplace' ? '#000000' : 'transparent',
                    color: activeTab === 'marketplace' ? '#ffffff' : '#666666',
                    fontWeight: 600,
                    height: '40px',
                    padding: '0 20px',
                  }}
                  onClick={() => setActiveTab('marketplace')}
                >
                  Marketplace
                </Button>
                <Button
                  size="sm"
                  radius="md"
                  style={{
                    backgroundColor: activeTab === 'myStrategies' ? '#000000' : 'transparent',
                    color: activeTab === 'myStrategies' ? '#ffffff' : '#666666',
                    fontWeight: 600,
                    height: '40px',
                    padding: '0 20px',
                  }}
                  onClick={() => setActiveTab('myStrategies')}
                >
                  My Strategies
                </Button>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <TextInput
                placeholder="Search strategies by name, ID or category..."
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                leftSection={<IconSearch size={16} stroke={2} color="#adb5bd" />}
                radius="md"
                styles={{
                  input: {
                    height: '40px',
                    borderColor: '#e2e8f0',
                    '&:focus': {
                      borderColor: '#000000'
                    }
                  }
                }}
              />
            </Grid.Col>
          </Grid>
        </Card>

        {/* Main Interface Switching Content */}
        {activeTab === 'marketplace' ? (
          <Stack gap="xl">
            {Object.keys(groupedMarketplaceStrategies).length === 0 ? (
              <Text ta="center" c="dimmed" py="xl">No matching strategies found.</Text>
            ) : (
              Object.entries(groupedMarketplaceStrategies).map(([category, items]) => (
                <Box key={category} mb="md">
                  {/* Category Group Header Block */}
                  <Group gap="xs" mb="lg" style={{ borderBottom: '2px solid #eef2f6', paddingBottom: '8px' }}>
                    <IconFolder size={20} color="#495057" stroke={2} />
                    <Text size="xl" fw={700} c="#1a1b1e" style={{ letterSpacing: '-0.3px' }}>
                      {category}
                    </Text>
                    <Text size="xs" fw={700} c="dimmed" px="8px" py="2px" style={{ backgroundColor: '#eef2f6', borderRadius: '12px', marginLeft: '4px' }}>
                      {items.length}
                    </Text>
                  </Group>

                  {/* Strategies belonging to this specific category */}
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    {items.map((strategy) => {
                      const isDeployed = deployedStrategyIds.has(strategy.id);
                      const isRunning = isCurrentTimeBetween(strategy.starting_time, strategy.ending_time);
                      const isDisabled = isDeployed || isRunning;

                      return (
                        <Card
                          key={strategy.id}
                          padding="xl"
                          radius="lg"
                          withBorder
                          style={{
                            backgroundColor: 'white',
                            borderColor: '#eef2f6',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.015)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.015)";
                          }}
                        >
                          <Box mb="xl">
                            <Group justify="space-between" align="center" mb="sm">
                              <Text size="xl" fw={600} c="#1a1b1e">
                                {strategy.name}
                              </Text>
                              <Text size="xs" fw={700} c="dimmed" px="8px" py="4px" style={{ backgroundColor: '#f1f3f5', borderRadius: '6px' }}>
                                ID: {strategy.state_id || 'N/A'}
                              </Text>
                            </Group>

                            <Text size="sm" c="#495057" style={{ lineHeight: 1.6 }}>
                              {expanded[strategy.id]
                                ? strategy.description
                                : `${strategy.description.slice(0, 120)}${strategy.description.length > 120 ? "..." : ""}`
                              }

                              {strategy.description.length > 120 && (
                                <Anchor
                                  component="button"
                                  size="sm"
                                  ml={6}
                                  onClick={() => toggleExpand(strategy.id)}
                                  style={{ color: '#000000', fontWeight: 600, textDecoration: 'none' }}
                                >
                                  {expanded[strategy.id] ? "Show less" : "Read more"}
                                </Anchor>
                              )}
                            </Text>
                          </Box>

                          <Group justify="space-between" align="flex-end" pt="md" style={{ borderTop: '1px solid #f8fafc' }}>
                            <Box>
                              <Text size="xs" fw={500} c="#868e96" mb={4}>
                                REQUIRED CAPITAL
                              </Text>
                              <Group gap={2} align="center">
                                <IconCurrencyRupee size={18} color="#000000" stroke={2.5} />
                                <Text size="xl" fw={700} c="#000000">
                                  {strategy.capital_required ? Number(strategy.capital_required).toLocaleString('en-IN') : '0'}
                                </Text>
                              </Group>
                            </Box>

                            <Button
                              size="md"
                              radius="md"
                              disabled={isDisabled}
                              onClick={() => openModal(strategy.name, strategy.id)}
                              leftSection={isRunning && !isDeployed ? <IconClock size={16} /> : undefined}
                              style={{
                                backgroundColor: isDisabled ? '#f1f3f5' : '#000000',
                                color: isDisabled ? '#adb5bd' : '#ffffff',
                                border: 'none',
                                fontWeight: 600,
                                height: '44px',
                                padding: '0 28px',
                                transition: 'opacity 0.2s ease',
                              }}
                              onMouseEnter={(e) => { if (!isDisabled) e.currentTarget.style.opacity = "0.85"; }}
                              onMouseLeave={(e) => { if (!isDisabled) e.currentTarget.style.opacity = "1"; }}
                            >
                              {isDeployed ? "DEPLOYED" : isRunning ? "RUNNING TIME" : "DEPLOY STRATEGY"}
                            </Button>
                          </Group>
                        </Card>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              ))
            )}
          </Stack>
        ) : (
          <Grid gutter="xl">
            {mystartergieslist.map((signal) => (
              <Grid.Col
                key={signal.id}
                span={{ base: 12, sm: 6, lg: 4 }}
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
        )}

      </Container>

      <DeployStrategyModal
        opened={opened}
        onClose={() => setOpened(false)}
        strategyName={selectedStrategy}
        strategy_id={strategyid}
      />
    </Box>
  );
};

export default Stratergies;