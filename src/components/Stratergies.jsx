import React, { useEffect, useState } from 'react';
import { Box, Container, Group, Button, TextInput, Text, Card, Anchor, Grid, Stack, SimpleGrid, Modal, Badge, } from '@mantine/core';
import { IconSearch, IconCurrencyRupee, IconLayersIntersect, IconTrendingUp, IconClock, IconFolder,   IconBookmark } from '@tabler/icons-react';
import { apiRequest } from '../utils/api';
import DeployStrategyModal from './atoms/DeployStrategyModal';

const Stratergies = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedFee, setSelectedFee] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [strategies, setstrategies] = useState([]);
  const [mystartergieslist, setmystartergieslist] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [strategyid, setstrategyid] = useState('');
  const [todaydeployment, settodaydeployment] = useState([]);
  const [savedStrategies, setSavedStrategies] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);

  const [bookmarkModal, setBookmarkModal] = useState({
    opened: false,
    strategy: null,
    action: null,
  });

  const [bookmarkLoading, setBookmarkLoading] = useState(false);




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

  const openModal = (strategy) => {
    setSelectedStrategy(strategy);
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

  const savedStrategyObjects = savedStrategies
  .map((saved) => {
    const originalStrategy = strategies.find(
      (strategy) =>
        String(strategy.id) === String(saved.strategy_id)
    );

    if (!originalStrategy) {
      return null;
    }

    return {
      ...originalStrategy,
      saved_strategy_id: saved.id,
    };
  })
  .filter(Boolean);

  const filteredSavedStrategies = savedStrategyObjects.filter(
  (strategy) => {
    if (!search) return true;

    const query = search.toLowerCase();

    return (
      strategy.state_id?.toString().toLowerCase().includes(query) ||
      strategy.name?.toLowerCase().includes(query) ||
      strategy.description?.toLowerCase().includes(query) ||
      strategy.category?.toLowerCase().includes(query)
    );
  }
);

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

 

  const fetmystartergies = async () => {
    try {
      const strategies = await apiRequest("POST", "/api/createstartergy/user/userid");
      setmystartergieslist(strategies);
    }
    catch (err) {
      console.log(err);
    }
  };

  
  const fetchuser = async () => {
    try {
      const res = await apiRequest("POST", "/api/users/me");
  
      
      //console.log("User fetched successfully:", res);
  
      // Fetch strategies immediately using the fetched user
      Fetchstartergies(res.id);
  
    } catch (err) {
      console.log(err);
    }
  };
  
  const Fetchstartergies = async (userId) => {
    try {
      const response = await apiRequest(
        "GET",
        `/api/stratergy/user/${userId}`
      );
  
      const sortedStrategies = response.strategies.sort(
        (a, b) => Number(a.state_id) - Number(b.state_id)
      );
  
      setstrategies(sortedStrategies);

  
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedStrategies = async () => {
  try {
    setSavedLoading(true);

    const response = await apiRequest(
      'GET',
      '/api/saved-strategies/my'
    );

    const saved = response?.strategies || [];

    setSavedStrategies(saved);

  } catch (err) {
    console.log('Saved strategies error:', err);
  } finally {
    setSavedLoading(false);
  }
};
  
  useEffect(() => {
    fetchuser();
    fetmystartergies();
    fetchSavedStrategies();
  }, []);
  
  const savedStrategyIds = new Set(
  savedStrategies
    .map((item) => item.strategy_id)
    .filter(Boolean)
);


  const handleBookmarkPress = (strategy) => {
  const isSaved = savedStrategyIds.has(strategy.id);

  setBookmarkModal({
    opened: true,
    strategy,
    action: isSaved ? 'unsave' : 'save',
  });
};

  const closeBookmarkModal = () => {
  if (bookmarkLoading) return;

  setBookmarkModal({
    opened: false,
    strategy: null,
    action: null,
  });
};

  const confirmBookmarkAction = async () => {
  const strategy = bookmarkModal.strategy;
  const action = bookmarkModal.action;

  if (!strategy || !action || bookmarkLoading) {
    return;
  }

  try {
    setBookmarkLoading(true);

    if (action === 'save') {
      const response = await apiRequest(
        'POST',
        '/api/saved-strategies',
        {
          strategyId: strategy.id,
        }
      );

      if (response?.strategy) {
        setSavedStrategies((prev) => [
          ...prev,
          response.strategy,
        ]);
      } else {
        // In case API doesn't return the saved row,
        // refresh from backend.
        await fetchSavedStrategies();
      }

    } else {
      const savedStrategy = savedStrategies.find(
        (item) =>
          String(item.strategy_id) === String(strategy.id)
      );

      if (!savedStrategy) {
        throw new Error('Saved strategy not found');
      }

      await apiRequest(
        'DELETE',
        `/api/saved-strategies/${savedStrategy.id}`
      );

      setSavedStrategies((prev) =>
        prev.filter(
          (item) => item.id !== savedStrategy.id
        )
      );
    }

    closeBookmarkModal();

  } catch (err) {
    console.error('Bookmark error:', err);

    alert(
      err?.message ||
      'Unable to update saved strategy'
    );

  } finally {
    setBookmarkLoading(false);
  }
};

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
              <Group gap="xs" wrap="wrap">

  {/* MARKETPLACE */}
  <Button
    size="sm"
    radius="md"
    leftSection={<IconLayersIntersect size={16} />}
    style={{
      backgroundColor:
        activeTab === 'marketplace'
          ? '#000000'
          : 'transparent',

      color:
        activeTab === 'marketplace'
          ? '#ffffff'
          : '#666666',

      fontWeight: 600,
      height: '40px',
      padding: '0 20px',
    }}
    onClick={() => setActiveTab('marketplace')}
  >
    Marketplace
  </Button>


  {/* SAVED STRATEGIES */}
  <Button
    size="sm"
    radius="md"
    leftSection={<IconBookmark size={16} />}
    style={{
      backgroundColor:
        activeTab === 'savedStrategies'
          ? '#000000'
          : 'transparent',

      color:
        activeTab === 'savedStrategies'
          ? '#ffffff'
          : '#666666',

      fontWeight: 600,
      height: '40px',
      padding: '0 20px',
    }}
    onClick={() => {
      setActiveTab('savedStrategies');
      fetchSavedStrategies();
    }}
  >
    Saved Strategies

    {savedStrategies.length > 0 && (
      <Badge
        size="sm"
        ml={8}
        radius="xl"
        color={
          activeTab === 'savedStrategies'
            ? 'gray'
            : 'dark'
        }
      >
        {savedStrategies.length}
      </Badge>
    )}
  </Button>


  {/* MY STRATEGIES */}
  <Button
    size="sm"
    radius="md"
    style={{
      backgroundColor:
        activeTab === 'myStrategies'
          ? '#000000'
          : 'transparent',

      color:
        activeTab === 'myStrategies'
          ? '#ffffff'
          : '#666666',

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

    {Object.entries(groupedMarketplaceStrategies).map(
      ([category, items]) => (
        <Box key={category}>

          <Group gap="xs" mb="md">
            <IconFolder size={20} />
            <Text fw={700} size="lg">
              {category}
            </Text>

            <Text size="sm" c="dimmed">
              {items.length}
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">

            {items.map((strategy) => {

              const isDeployed =
                deployedStrategyIds.has(strategy.id);

              const isRunning = isCurrentTimeBetween(
                strategy.starting_time,
                strategy.ending_time
              );

              const isDisabled =
                isDeployed || isRunning;

              return (
                <Card key={strategy.id} withBorder radius="md" p="lg">

                  <Text fw={700} size="lg">
                    {strategy.name}
                  </Text>

                  <Text
                    size="sm"
                    c="dimmed"
                    mt="xs"
                    lineClamp={3}
                  >
                    {strategy.description}
                  </Text>

                  {/* YOUR OTHER STRATEGY DETAILS */}

                  <Group
                    justify="space-between"
                    align="flex-end"
                    mt="xl"
                  >

                    <Box>
                      <Text
                        size="xs"
                        fw={700}
                        c="dimmed"
                      >
                        REQUIRED CAPITAL
                      </Text>

                      <Group gap={4}>
                        <IconCurrencyRupee size={18} />

                        <Text fw={700}>
                          {strategy.capital_required
                            ? Number(
                                strategy.capital_required
                              ).toLocaleString('en-IN')
                            : '0'}
                        </Text>
                      </Group>
                    </Box>

                    <Group gap="xs">

                      {/* SAVE / SAVED */}
                      <Button
                        variant={
                          savedStrategyIds.has(strategy.id)
                            ? "light"
                            : "default"
                        }
                        onClick={() =>
                          handleBookmarkPress(strategy)
                        }
                      >
                        {savedStrategyIds.has(strategy.id)
                          ? "SAVED"
                          : "SAVE"}
                      </Button>

                      {/* DEPLOY */}
                      <Button
                        bg={"#000000"}
                        disabled={isDisabled}
                        onClick={() =>
                          openModal(strategy)
                        }
                      >
                        {isDeployed
                          ? "DEPLOYED"
                          : isRunning
                          ? "RUNNING TIME"
                          : "DEPLOY STRATEGY"}
                      </Button>

                    </Group>

                  </Group>

                </Card>
              );
            })}

          </SimpleGrid>
        </Box>
      )
    )}

  </Stack>
) : activeTab === 'savedStrategies' ? (

  /* SAVED STRATEGIES */
  <Stack gap="xl">

    {savedLoading ? (
      <Text ta="center" c="dimmed" py="xl">
        Loading saved strategies...
      </Text>

    ) : filteredSavedStrategies.length === 0 ? (

      <Card
        radius="lg"
        withBorder
        p="xl"
        style={{
          borderColor: '#eef2f6',
          textAlign: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Stack align="center" gap="sm">

          <IconBookmark
            size={36}
            color="#adb5bd"
            stroke={1.5}
          />

          <Text
            size="lg"
            fw={600}
            c="#1a1b1e"
          >
            No saved strategies
          </Text>

          <Text
            size="sm"
            c="dimmed"
          >
            Save strategies from the Marketplace
            to find them here.
          </Text>

          <Button
            radius="md"
            onClick={() =>
              setActiveTab('marketplace')
            }
            style={{
              backgroundColor: '#000000',
              marginTop: '10px',
            }}
          >
            GO TO MARKETPLACE
          </Button>

        </Stack>
      </Card>

    ) : (

      <SimpleGrid
        cols={{
          base: 1,
          md: 2,
        }}
        spacing="lg"
      >

        {filteredSavedStrategies.map((strategy) => {

          const isDeployed =
            deployedStrategyIds.has(strategy.id);

          const isRunning =
            isCurrentTimeBetween(
              strategy.starting_time,
              strategy.ending_time
            );

          const isDisabled =
            isDeployed || isRunning;

          return (
            <Card
              key={strategy.id}
              padding="xl"
              radius="lg"
              withBorder
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#eef2f6',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow:
                  '0 4px 20px rgba(0, 0, 0, 0.015)',
                transition:
                  'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >

              <Box mb="xl">

                <Group
                  justify="space-between"
                  align="center"
                  mb="sm"
                >

                  <Group gap="sm">

                    <Text
                      size="xl"
                      fw={600}
                      c="#1a1b1e"
                    >
                      {strategy.name}
                    </Text>

                    <Badge
                      size="xs"
                      variant="light"
                      color="blue"
                      leftSection={
                        <IconBookmark
                          size={11}
                        />
                      }
                    >
                      SAVED
                    </Badge>

                  </Group>

                  <Text
                    size="xs"
                    fw={700}
                    c="dimmed"
                    px="8px"
                    py="4px"
                    style={{
                      backgroundColor: '#f1f3f5',
                      borderRadius: '6px',
                    }}
                  >
                    ID: {strategy.state_id || 'N/A'}
                  </Text>

                </Group>


                <Text
                  size="sm"
                  c="#495057"
                  style={{
                    lineHeight: 1.6,
                  }}
                >
                  {expanded[strategy.id]
                    ? strategy.description
                    : `${strategy.description.slice(
                        0,
                        120
                      )}${
                        strategy.description.length > 120
                          ? "..."
                          : ""
                      }`
                  }

                  {strategy.description.length > 120 && (
                    <Anchor
                      component="button"
                      size="sm"
                      ml={6}
                      onClick={() =>
                        toggleExpand(strategy.id)
                      }
                      style={{
                        color: '#000000',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      {expanded[strategy.id]
                        ? "Show less"
                        : "Read more"}
                    </Anchor>
                  )}

                </Text>

              </Box>


              <Group
                justify="space-between"
                align="flex-end"
                pt="md"
                style={{
                  borderTop: '1px solid #f8fafc',
                  }}
                >

                <Box>
                    <Text
      size="xs"
      fw={500}
      c="#868e96"
      mb={4}
    >
      REQUIRED CAPITAL
    </Text>

    <Group gap={2} align="center">

      <IconCurrencyRupee
        size={18}
        color="#000000"
        stroke={2.5}
      />

      <Text
        size="xl"
        fw={700}
        c="#000000"
      >
        {strategy.capital_required
          ? Number(
              strategy.capital_required
            ).toLocaleString('en-IN')
          : '0'}
      </Text>

    </Group>
  </Box>


  <Group gap="sm">

    {/* SAVE / UNSAVE */}
    <Button
      size="sm"
      radius="md"
      variant={
        savedStrategyIds.has(strategy.id)
          ? "light"
          : "outline"
      }
      color={
        savedStrategyIds.has(strategy.id)
          ? "blue"
          : "dark"
      }
      leftSection={
        <IconBookmark
          size={15}
          fill={
            savedStrategyIds.has(strategy.id)
              ? "currentColor"
              : "none"
          }
        />
      }
      onClick={() =>
        handleBookmarkPress(strategy)
      }
    >
      {savedStrategyIds.has(strategy.id)
        ? "SAVED"
        : "SAVE"}
    </Button>


    {/* DEPLOY */}
    <Button
      size="md"
      radius="md"
      disabled={isDisabled}
      onClick={() =>
        openModal(strategy)
      }
      leftSection={
        isRunning &&
        !isDeployed ? (
          <IconClock size={16} />
        ) : undefined
      }
      style={{
        backgroundColor:
          isDisabled
            ? '#f1f3f5'
            : '#000000',

        color:
          isDisabled
            ? '#adb5bd'
            : '#ffffff',

        border: 'none',
        fontWeight: 600,
        height: '44px',
        padding: '0 28px',
        transition:
          'opacity 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.opacity =
            "0.85";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.opacity =
            "1";
        }
      }}
    >
      {isDeployed
        ? "DEPLOYED"
        : isRunning
        ? "RUNNING TIME"
        : "DEPLOY STRATEGY"}
    </Button>

  </Group>

</Group>

            </Card>
          );
        })}

      </SimpleGrid>
    )}

  </Stack>

) : (

  /* MY STRATEGIES */
  <Grid gutter="xl">
    {mystartergieslist.map((signal) => (
      <Grid.Col
        key={signal.id}
        span={{
          base: 12,
          sm: 6,
          lg: 4
        }}
      >
        <SingleTraderSignal
          startergyname={signal.startergy_name}
          description={signal.description}
          timestamp={signal.created_at}
          strategyid={signal.id}
          onView={() =>
            console.log(
              "view",
              signal.id
            )
          }
        />
      </Grid.Col>
    ))}
  </Grid>
)}

      </Container>

      <DeployStrategyModal
        opened={opened}
        onClose={() => setOpened(false)}
        strategy={selectedStrategy}
      />

      <Modal
  opened={bookmarkModal.opened}
  onClose={closeBookmarkModal}
  centered
  radius="lg"
  title={
    bookmarkModal.action === 'save'
      ? 'Save Strategy?'
      : 'Unsave Strategy?'
  }
>

  <Stack gap="md">

    <Text size="sm" c="dimmed">
      {bookmarkModal.action === 'save'
        ? `Are you sure you want to save "${bookmarkModal.strategy?.name || 'this strategy'}"?`
        : `Are you sure you want to remove "${bookmarkModal.strategy?.name || 'this strategy'}" from your saved strategies?`
      }
    </Text>


    <Group
      justify="flex-end"
      mt="md"
    >

      <Button
        variant="default"
        radius="md"
        onClick={closeBookmarkModal}
        disabled={bookmarkLoading}
      >
        CANCEL
      </Button>


      <Button
        radius="md"
        onClick={confirmBookmarkAction}
        loading={bookmarkLoading}
        style={{
          backgroundColor: '#000000',
        }}
      >
        {bookmarkModal.action === 'save'
          ? 'SAVE'
          : 'UNSAVE'}
      </Button>

    </Group>

  </Stack>

</Modal>
    </Box>
  );
};

export default Stratergies;
 