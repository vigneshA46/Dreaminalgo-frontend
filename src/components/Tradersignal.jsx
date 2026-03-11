import { ActionIcon, Box, Button, Card, Container, Divider, Flex, Grid, Group, NumberInput, SegmentedControl, Select, Switch, Text, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'
import Leg from './Leg';
import { IconCopy, IconTrash } from '@tabler/icons-react';
import { TimeInput } from "@mantine/dates";


const Tradersignal = () => {
  
  const [marketType, setMarketType] = useState("options");
  const [entryType, setEntryType] = useState("Time");
  const [slEnabled, setSlEnabled] = useState(false);
  const [slType, setSlType] = useState("time");
  const [reentrySL, setReentrySL] = useState(false);
  const [reentrySLCount, setReentrySLCount] = useState(1);
  const [targetType, setTargetType] = useState("time");
  const [reentryTarget, setReentryTarget] = useState(false);
  const [reentryTargetCount, setReentryTargetCount] = useState(1);
  const [formData, setFormData] = useState({
  lots: 1,
  position: "Sell",
  option_type: "Call",
  strike_price: "",
  expiry: "This Week"
});

  
  const expiryOptions =
  marketType === "futures"
  ? ["Current Month", "Next Month"]
  : ["This Week", "Next Week"];
  
  const [legs, setLegs] = useState([]);


  const handleChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value
  }));
};

const addLeg = () => {
  setLegs((prev) => [
    ...prev,
    {
      id: Date.now(),
      ...formData,
      segment: marketType
    }
  ]);
};

const deleteLeg = (id) => {
  setLegs((prev) => prev.filter((leg) => leg.id !== id));
};

const copyLeg = (leg) => {
  const newLeg = {
    ...leg,
    id: Date.now()
  };

  setLegs((prev) => [...prev, newLeg]);
};


  return (
    <Container size="xl" py="md">
      <Title mb={10} order={3} >
        Trader Signal
      </Title>
      <Grid>
      
              {/* INSTRUMENT SETTINGS */}
      
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg">
      
                  <Title order={5} mb="md">
                    Instrument settings
                  </Title>
      
                  <Select
                    label="Index"
                    data={["NIFTY", "BANKNIFTY", "FINNIFTY"]}
                    defaultValue="NIFTY"
                  />  
                </Card>
              </Grid.Col>
      
              {/* ENTRY SETTINGS */}
      
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Card shadow="sm" p="lg">
      
                  <Title order={5} mb="md">
                    Creator Name
                  </Title>
                  <TextInput label="Name" type='text' /> 

                </Card>
              </Grid.Col>
      
              {/* LEGWISE SETTINGS */}
      {/* 
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Card shadow="sm" p="lg">
      
                  <Title order={5} mb="md">
                    Legwise settings
                  </Title>
      
                  <SegmentedControl
                    fullWidth
                    data={[
                      { label: "Partial", value: "partial" },
                      { label: "Complete", value: "complete" }
                    ]}
                  />
      
                  <Switch
                    mt="md"
                    label="Trail SL to Break-even price"
                  />
      
                  <SegmentedControl
                    mt="md"
                    fullWidth
                    data={[
                      { label: "All Legs", value: "all" },
                      { label: "SL Legs", value: "sl" }
                    ]}
                  />
      
                </Card>
              </Grid.Col> */}
      
            </Grid> 

            {/* LEG BUILDER */}
                  <Card shadow="sm" p="lg" my="lg">
      <Group justify="space-between" mb="md">
        <Title order={4}>Leg Builder</Title>
      </Group>

      <Grid>
        {/* Market Type */}
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Text fw={500} size="0.9rem" mb="0.5rem">
            Market Type
          </Text>

          <SegmentedControl
            fullWidth
            value={marketType}
            onChange={setMarketType}
            data={[
              { label: "Futures", value: "futures" },
              { label: "Options", value: "options" }
            ]}
          />
        </Grid.Col>

        {/* Lot */}
        <Grid.Col span={{ base: 12, md: 1 }}>
          <NumberInput
  label="Total Lot"
  value={formData.lots}
  onChange={(val) => handleChange("lots", val)}
/>
        </Grid.Col>

        {/* Position (Only for Options) */}
    
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Text fw={500} size="0.9rem" mb="0.5rem">
              Position
            </Text>

            <SegmentedControl
  fullWidth
  value={formData.position}
  onChange={(val) => handleChange("position", val)}
  data={[
    { label: "Buy", value: "Buy" },
    { label: "Sell", value: "Sell" }
  ]}
/>
          </Grid.Col>
        

        {/* Option Type (Only for Options) */}
        {marketType === "options" && (
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Text fw={500} size="0.9rem" mb="0.5rem">
              Option Type
            </Text>

            <SegmentedControl
  fullWidth
  value={formData.option_type}
  onChange={(val) => handleChange("option_type", val)}
  data={[
    { label: "Call", value: "Call" },
    { label: "Put", value: "Put" }
  ]}
/>
          </Grid.Col>
        )}

        {/* Expiry */}
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Select
            label="Expiry"
            data={expiryOptions}
            onSelect={(value)=>handleChange("expiry",value)}
          />
        </Grid.Col>

        {/* Strike */}
        {marketType === "options" && (
        <Grid.Col span={{ base: 12, md: 2 }}>
          <TextInput
  label="Strike Price"
  type="number"
  value={formData.strike_price}
  onChange={(e) => handleChange("strike_price", e.target.value)}
/>
        </Grid.Col>
        )}
      </Grid>

      <Group justify="center" mt="md">
        <Button bg="#000" onClick={addLeg}>Add Leg</Button>
      </Group>
    </Card>

    {legs.map((leg, index) => (
  <Card key={leg.id} shadow="sm" p="sm" mt="md">

    <Group justify="space-between" mb="xs">
      <Text fw={600}>Leg #{index + 1}</Text>

      <Group>
        <ActionIcon
          variant="light"
          onClick={() => copyLeg(leg)}
        >
          <IconCopy size={16} />
        </ActionIcon>

        <ActionIcon
          variant="light"
          color="red"
          onClick={() => deleteLeg(leg.id)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </Group>

    <Leg
      number={index + 1}
      segment={leg.segment}
      lots={leg.lots}
      position={leg.position}
      option_type={leg.option_type}
      strike_price={leg.strike_price}
      expiry={leg.expiry}
    />

  </Card>
))}

    <Flex align={"center"} justify={"center"} my={"2rem"} >
      <Button bg={"#000"}  >Save Signal</Button>
    </Flex>

    </Container>
  )
}

export default Tradersignal
 