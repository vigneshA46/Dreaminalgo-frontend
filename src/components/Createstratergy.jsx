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

export default function CreateStrategy() {
  const [mode, setMode] = useState("intraday");
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
        {marketType === "options" && (
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
        )}

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
            defaultValue={expiryOptions[0]}
          />
        </Grid.Col>

        {/* Strike */}
        <Grid.Col span={{ base: 12, md: 2 }}>
          <TextInput
  label="Strike Price"
  type="number"
  value={formData.strike_price}
  onChange={(e) => handleChange("strike_price", e.target.value)}
/>
        </Grid.Col>
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


      {/* OVERALL SETTINGS */}

      <Title order={4} mb="sm">
        Overall Strategy Settings
      </Title>

      <Grid mb="lg">

        {/* STOP LOSS */}

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg">

            <Group justify="space-between">
              <span>Overall Stop Loss</span>
              <Switch />
            </Group>

            <Select
              mt="md"
              data={["MTM", "Points","Percentage"]}
              defaultValue="Max Loss"
            />

            <NumberInput mt="sm" placeholder="0" />

            <Group justify="space-between" mt="lg">
              <span>Overall Re-entry on SL</span>
              <Switch />
            </Group>

            <Select
              mt="sm"
              data={["RE ASAP", "Next Candle"]}
              defaultValue="RE ASAP"
            />

          </Card>
        </Grid.Col>

        {/* TARGET */}

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg">

            <Group justify="space-between">
              <span>Overall Target</span>
              <Switch />
            </Group>

            <Select
              mt="md"
              data={["MTM", "Points","Percentage"]}
              defaultValue="Max Profit"
            />

            <NumberInput mt="sm" placeholder="0" />

            <Group justify="space-between" mt="lg">
              <span>Overall Re-entry on Tgt</span>
              <Switch />
            </Group>

            <Select
              mt="sm"
              data={["RE ASAP", "Next Candle"]}
              defaultValue="RE ASAP"
            />

          </Card>
        </Grid.Col>

                {/* TRAILING */}
        
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" p="lg">
        
                    <Group justify="space-between">
                      <span>Trailing Options</span>
                      <Switch />
                    </Group>
        
                    <Select
                      mt="md"
                      data={["MTM", "Points","Percentage"]}
                      defaultValue="Lock"
                    />
        
                    <NumberInput
                      mt="sm"
                      label="TSL Active"
                      placeholder="0"
                    />
        
                    <NumberInput
                      mt="sm"
                      label="SL positition"
                      placeholder="1"
                    />
                    <NumberInput
                      mt="sm"
                      label="Trail Value"
                      placeholder="1"
                    />
                    <Group mt={"1rem"} ><Text>Re-entry after TSL</Text> <Switch/></Group>
        
                  </Card>
                </Grid.Col> 

      </Grid>

      {/* LOWER SECTION */}

          <Flex align={"center"} justify={"center"} >
        <Button  bg={"#000"} >Create Startergy</Button>
        </Flex>
    </Container>
  );
}