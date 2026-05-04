import { ActionIcon, Box, Button, Card, Grid, Group, Stack, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { apiRequest } from '../utils/api';
import { IconTrash } from '@tabler/icons-react';

const SingleTraderSignal = ({
  creatorName,
  timestamp,
  instrument,
  description,
  onView,
  onDeploy,
  onDelete,
  showDelete   // ✅ new prop
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
        position: "relative"
      }}
    >
      {/* 🔥 Show only if My Signals */}
      {showDelete && (
        <ActionIcon
          color="red"
          variant="subtle"
          style={{
            position: "absolute",
            top: 10,
            right: 10
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <IconTrash size={18} />
        </ActionIcon>
      )}

      {/* Content */}
      <Stack gap={6}>
        <Text fw={600} size="md">
          {creatorName}
        </Text>

        <Text size="xs" c="dimmed">
          {timestamp}
        </Text>

        <Text fw={500} size="sm">
          Instrument: {instrument}
        </Text>

        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Stack>

      {/* Buttons */}
      <Group mt="lg" grow px={"1rem"}>
        <Button
          radius={"0.4rem"}
          styles={{
            root: {
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
          onClick={onDeploy}
        >
          Deploy
        </Button>
      </Group>
    </Card>
  );
};
const Createtradersignal = () => {
  const [signals, setSignals] = useState([]);
      const [activeTab, setActiveTab] = useState('Trader Signals');
  
       const Fetchsignals = async ()=>{
        setActiveTab('Trader Signals')
      const response = await apiRequest('GET','/api/trader-signal/status/true')
      await setSignals(response.data)
      /* console.log(response.data) */
    }

  useEffect(()=>{
    Fetchsignals()
  },[])

const deletesignal = async(id) =>{
  const confirmDelete = window.confirm("Are you sure you want to delete this signal?");

  if (!confirmDelete) return;

  try  { 
    await apiRequest('DELETE', `/api/signals/${id}`)
    setSignals(prev => prev.filter(s => s.id !== id))
  } catch(err){
    console.log(err)
  }
}

    const Fetchusersignals = async ()=>{

      setActiveTab('My Signals')
      
      const response = await apiRequest('GET','/api/trader-signal/user')

      await setSignals(response.data)
      /* console.log(response.data) */
    }
  return (
    <>
    <Title py={"0rem"} order={4} >This feature is in testing feature not for production</Title>
    <Title py={"1.5rem"} order={4} >Trader Signals</Title>
              <Group gap="md" mb="xl">
                <Button
                  size="md"
                  radius="xl"
                  style={{
                    backgroundColor: activeTab === 'Trader Signals' ? '#000000ff' : 'transparent',
                    color: activeTab === 'Trader Signals' ? 'white' : '#495057',
                    border: 'none',
                    fontWeight: 500,
                    paddingLeft: '28px',
                    paddingRight: '28px',
                  }}
                  onClick={() => Fetchsignals()}
                >
                  Trader Signals
                </Button>
                <Button
                  size="md"
                  radius="xl"
                  variant="subtle"
                  style={{
                    backgroundColor: activeTab === 'My Signals' ? '#000000ff' : 'transparent',
                    color: activeTab === 'My Signals' ? 'white' : '#495057',
                    border: 'none',
                    fontWeight: 500,
                    paddingLeft: '28px',
                    paddingRight: '28px',
                  }}
                  onClick={() => Fetchusersignals()}
                >
                  My Signals
                </Button>
              </Group>
    <Grid>
      {signals.map((signal) => (
        <Grid.Col
          key={signal.id}
          span={{ base: 12, sm: 6, md: 4, lg: 4 }}
        >
          <SingleTraderSignal
            creatorName={signal.creator_name}
            timestamp={signal.created_at}
            instrument={signal.index_name}
            description={signal.description}
            onView={() => console.log("view", signal.id)}
            onDeploy={() => console.log("deploy", signal.id)}
            onDelete={() => deletesignal(signal.id)} 
            showDelete={activeTab === 'My Signals'} 
          />
        </Grid.Col>
      ))}
    </Grid>
    </>
  )
}

export default Createtradersignal
