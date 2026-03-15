import { ActionIcon, Box, Button, Card, Container, Divider, Flex, Grid, Group, NumberInput, SegmentedControl, Select, Switch, Text, Textarea, TextInput, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Leg from './Leg';
import { IconCopy, IconTrash } from '@tabler/icons-react';
import { TimeInput } from "@mantine/dates";
import { apiRequest } from '../utils/api';


const Tradersignal = () => {
  const [indexes, setIndexes] = useState([])
const [index, setIndex] = useState(null)
const [index_neme , setindex_name] = useState("")
const [description , setdescription] = useState("")
useEffect(() => {

  const fetchIndexes = async () => {
    try {

      const res = await apiRequest("GET", "/api/instruments/indexes")

      const formatted = res.map((item) => ({
        value: item.id,
        label: item.index_name
      }))
      setIndexes(formatted)
 
    } catch (err) {
      console.log("Index fetch error:", err)
    }
  }

  fetchIndexes()

}, [])
  const createDefaultLeg = () => ({
  id: Date.now(),

  market_type: "options",

  lots: 1,
  position: "Sell",
  option_type: "Call",
  strike_price: "26000",
  expiry: "This Week",

  entry: {
    type: "current_price",
    value: null
  },

  stoploss: {
    enabled: false,
    type: "percentage",
    value: null,
    reentry: {
      enabled: false,
      count: 0
    }
  },

  target: {
    enabled: false,
    type: "mtm",
    value: null,
    reentry: {
      enabled: false,
      count: 0
    }
  },

  trailing: {
    enabled: false,
    type: "points",
    tsl_active: null,
    sl_position: null,
    trail_value: null,
    reentry: {
      enabled: false,
      count: 0
    }
  }
});
  
  const updateLeg = (id, path, value) => {
  setLegs((prev) =>
    prev.map((leg) => {
      if (leg.id !== id) return leg;

      const keys = path.split(".");
      let updated = { ...leg };

      let obj = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;

      return updated;
    })
  );
};

const handleSaveSignal = async() => {

  const signalJSON = {
    creator_name: creatorName,
    index_id: index,
    index_name:index_neme,
    description:description,
    config_json: {
      legs: legs
    },
    status:"pending"
  };
  const response = await apiRequest('POST','/api/trader-signal',{
    creator_name: creatorName,
    index_id: index,
    index_name:index_neme,
    description:description,
    config_json:{legs : legs},
    status:"pending"
  })

  console.log(response)
  console.log("FINAL SIGNAL JSON 👇");
  console.log(JSON.stringify(signalJSON, null, 2));
};



  const [marketType, setMarketType] = useState("options");
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

  const [creatorName, setCreatorName] = useState("");
  
  const [legs, setLegs] = useState([createDefaultLeg()]);



const addLeg = () => {
  setLegs((prev) => [...prev, createDefaultLeg()]);
};

const deleteLeg = (id) => {
  setLegs((prev) => prev.filter((leg) => leg.id !== id));
};

const copyLeg = (leg) => {
  const newLeg = {
    ...JSON.parse(JSON.stringify(leg)),
    id: Date.now()
  };

  setLegs((prev) => [...prev, newLeg]);
};

  return (
    <Container size="xl" py="md">
      <Title mb={10} order={3} >
        Create Signal
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
  placeholder="Select index"
  data={indexes}
  value={index}
  onChange={(value) => {
    setIndex(value);

    const selected = indexes.find((item) => item.value === value);
    setindex_name(selected?.label || "");
    
  }}
  searchable
  nothingFoundMessage="No index found"
/>
                </Card>
              </Grid.Col>
      
              {/* ENTRY SETTINGS */}
      
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg">
                   
                  <Title order={5} mb="md">
                    Creator Name
                  </Title>
                  <TextInput
  label="Name"
  value={creatorName}
  onChange={(e) => setCreatorName(e.target.value)}
/>

                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg">
                   
                  <Title order={5} mb="md">
                    Description
                  </Title>
                  <Textarea
                  value={description}
                  onChange={(e)=>setdescription(e.target.value)}
                  placeholder='Enter descripion'
  
/>

                </Card>
              </Grid.Col>
    
            </Grid> 

            {/* LEG BUILDER */}
          {legs.map((leg, index) => (
  <Card key={leg.id} shadow="sm" p="sm" mt="md">

    <Group justify="space-between" mb="xs">

      <Text fw={600}>#{index + 1}</Text>

      {/* Only show icons after first leg */}
        <Group>
          <ActionIcon
            variant="light"
            onClick={() => copyLeg(leg)}
            >
            <IconCopy size={16} />
          </ActionIcon>
          {index !== 0 && (

          <ActionIcon
            variant="light"
            color="red"
            onClick={() => deleteLeg(leg.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        )}
        </Group>

    </Group>

    <Leg
  leg={leg}
  updateLeg={updateLeg}
/>

    {/* Add Leg button only after first leg */}
    {index === 0 && (
      <Group justify="center" mt="md">
        <Button bg="#000" onClick={addLeg}>
          Add Leg
        </Button>
      </Group>
    )}

  </Card>
))}

 
    <Flex align={"center"} justify={"center"} my={"2rem"} >
      <Button bg="#000" onClick={handleSaveSignal}>
  Save Signal
</Button>
    </Flex>

    </Container>
  )
}

export default Tradersignal
 