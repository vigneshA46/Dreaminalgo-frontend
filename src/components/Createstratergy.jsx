import {
  Container,
  Grid,
  Card,
  Group,
  Title,
  Button,
  Select,
  NumberInput,
  SegmentedControl,
  Switch,
  TextInput,
  Divider,
  Text,
  ActionIcon,
  Flex
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";

import { useState } from "react";
import Leg from "./Leg";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import Createleg from "./Createleg";

export default function CreateStrategy() {
  const [mode, setMode] = useState("intraday");
    const [marketType, setMarketType] = useState("options");

    const strikeTypeOptions = [
  { label: "ATM Spot", value: "atm_spot" },
  { label: "ATM Futures", value: "atm_futures" },
  { label: "Premium Nearest", value: "premium_nearest" },
  { label: "Premium <", value: "premium_lt" },
  { label: "Premium >", value: "premium_gt" },
  { label: "Delta Nearest", value: "delta_nearest" },
  { label: "Delta <", value: "delta_lt" },
  { label: "Delta >", value: "delta_gt" }
];

const atmValueOptions = [
  { label: "ATM", value: "ATM" },
  { label: "ITM 0", value: "ITM0" },
  { label: "ITM 1", value: "ITM1" },
  { label: "OTM 0", value: "OTM0" },
  { label: "OTM 1", value: "OTM1" }
];
  
    const [formData, setFormData] = useState({
    lots: 1,
    position: "Sell",
    option_type: "Call",
    strike_price: "",
    expiry: "This Week",
    strike_type: "",
    strike_value: ""
  });
  
    
    const expiryOptions =
    marketType === "futures"
    ? ["Current Month", "Next Month"]
    : ["This Week", "Next Week"];
    
    const [legs, setLegs] = useState([
      {
    id: Date.now(), 
    segment: "options",
    lots: 1,
    position: "Sell",
    option_type: "Call",
    strike_type:"",
    strike_price:"",
    expiry: "This Week"
  }
    ]);
  
  
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

      <Title order={3} pb={"1rem"} >Create Startergy</Title>
      <Grid justify={"space-around"} >

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

          <Grid.Col mb={"1rem"} span={{ base: 12, md: 6 }}>
      <Card shadow="sm" p="lg">

        <Title order={5} mb="md">
          Entry settings
        </Title>

        <SegmentedControl
          fullWidth
          value={mode}
          onChange={setMode}
          data={[
            { label: "Intraday", value: "intraday" },
            { label: "BTST", value: "btst" },
            { label: "Positional", value: "positional" }
          ]}
        />

        {/* ---------- INTRADAY ---------- */}

        {mode === "intraday" && (
          <>
            <Grid mt="md">

              <Grid.Col span={6}>
                <TimeInput label="Entry Time" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TimeInput label="Exit Time" />
              </Grid.Col>

            </Grid>

            <Group mt="md" align="end">
              <Switch label="No re-entry after" />
              <TimeInput placeholder="Time" />
            </Group>
          </>
        )}

        {/* ---------- BTST ---------- */}

        {mode === "btst" && (
          <>
            <Grid mt="md">

              <Grid.Col span={6}>
                <TimeInput label="Entry Time" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TimeInput label="Exit Time" />
              </Grid.Col>

            </Grid>

            <Group mt="md" align="end">
              <Switch label="Delay restart" />
              <TimeInput placeholder="Time" />
            </Group>
          </>
        )}

        {/* ---------- POSITIONAL ---------- */}

        {mode === "positional" && (
          <>

            <Group mt="md">
              <Text>Position expiry on</Text>

              <Select
                w={140}
                data={[
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "monthly" }
                ]}
              />
            </Group>

            <Grid mt="md">

              <Grid.Col span={6}>
                <TimeInput label="Entry Time" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TimeInput label="Exit Time" />
              </Grid.Col>

            </Grid>

            <Grid mt="md">

              <Grid.Col span={6}>
                <Group align="end">
                  <Select
                    label="Entry"
                    w={90}
                    data={["0", "1", "2", "3", "4"]}
                  />
                  <Text mb={6}>trading days before expiry</Text>
                </Group>
              </Grid.Col>

              <Grid.Col span={6}>
                <Group align="end">
                  <Select
                    label="Exit"
                    w={90}
                    data={["0", "1", "2", "3", "4"]}
                  />
                  <Text mb={6}>trading days before expiry</Text>
                </Group>
              </Grid.Col>

            </Grid>

            <Group mt="md" align="end">
              <Switch label="Delay restart" />
              <TimeInput placeholder="Time" />
            </Group>

          </>
        )}

        {/* ---------- COMMON SECTION ---------- */}

        <Divider my="md" />

        <Group justify="space-between">
          <Text>Overall Momentum</Text>
          <Switch />
        </Group>

        <Group mt="sm">
          <Select
            data={[
              { label: "Points (Pts)", value: "points" },
              { label: "Percentage", value: "percentage" }
            ]}
            defaultValue="points"
          />

          <NumberInput defaultValue={50} />
        </Group>

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
                    
                        <Createleg
                          number={index + 1}
                          segment={leg.segment}
                          lots={leg.lots}
                          position={leg.position}
                          option_type={leg.option_type}
                          strike_type={leg.strike_type}
                          strike_value={leg.strike_value}
                          expiry={leg.expiry}
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
                    


    
      {/* LOWER SECTION */}

          <Flex align={"center"} justify={"center"} >
        <Button  bg={"#000"} >Create Startergy</Button>
        </Flex>
    </Container>
  );
}