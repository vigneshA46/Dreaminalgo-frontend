import { useState } from "react";
import {
  Card,
  Grid,
  Group,
  Select,
  NumberInput,
  Text,
  Switch,
  Button,
  ActionIcon,
  TextInput,
  Title,
  SegmentedControl
} from "@mantine/core";

import {
  IconCopy,
  IconTrash,
  IconInfoCircle
} from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";

export default function Createleg({
  segment = "options",
  lots = 1,
  position = "Sell",
  option_type="Call",
  expiry = "",
  number=1,
  strike_type= "",
  strike_value= ""
}) {
  const [marketType , setMarketType] = useState(segment);
  const [targetProfit, setTargetProfit] = useState(false);
  const [stopLoss, setStopLoss] = useState(false);
  const [trailSL, setTrailSL] = useState(false);
  const [reentryTgt, setReentryTgt] = useState(false);
  const [reentrySL, setReentrySL] = useState(false);
  const [momentum, setMomentum] = useState(false);
  const [rangeBreakout, setRangeBreakout] = useState(false);
  const [strikeType, setStrikeType] = useState(strike_type || "atm_spot");
  const [strikeValue, setStrikeValue] = useState(strike_value || "ATM");
    const [entryType, setEntryType] = useState("Current Price");

const [slEnabled, setSlEnabled] = useState(false);
const [slType, setSlType] = useState("limit");

const [reentrySLCount, setReentrySLCount] = useState(1);

const [targetType, setTargetType] = useState("mtm");

const [reentryTarget, setReentryTarget] = useState(false);
const [reentryTargetCount, setReentryTargetCount] = useState(1);

  const expiryOptions =
    marketType === "futures"
      ? ["Current Month", "Next Month"]
  : ["This Week", "Next Week"];

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

  return (
    <Card shadow="xs" radius="md" p="lg" withBorder>

      <Grid  >
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
            </Grid>

      {/* Main Inputs */}
      <Grid align="flex-end">

        <Grid.Col span={{ base: 12, md: 2 }}>
          <NumberInput label="Lots" defaultValue={lots} min={1} />
        </Grid.Col>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Select
              label="Position"
              data={["Buy", "Sell"]}
              defaultValue={position}
            />
          </Grid.Col>

        {marketType === "options" && (
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Select
              label="Option Type"
              data={["Call", "Put"]}
              defaultValue={option_type}
            />
          </Grid.Col>
        )}

        <Grid.Col span={{ base: 12, md: 2 }}>
          <Select
            label="Expiry"
            data={expiryOptions}
            defaultValue={expiry}
          />
        </Grid.Col>

         {marketType === "options" && (
  <Grid.Col span={{ base: 12, md: 4 }}>

    <Group align="center" gap={4}>
      <Text size="sm">Strike Selection</Text>
      <IconInfoCircle size={14} />
    </Group>

    <Group grow>

      {/* Strike Type */}
      <Select
        data={strikeTypeOptions}
        value={strikeType}
        onChange={(val) => setStrikeType(val)}
      />

      {/* Strike Value */}
      {(strikeType === "atm_spot" || strikeType === "atm_futures") ? (

        <Select
          data={atmValueOptions}
          value={strikeValue}
          onChange={(val) => setStrikeValue(val)}
        />

      ) : (

        <NumberInput
          placeholder="Value"
          value={strikeValue}
          onChange={(val) => setStrikeValue(val)}
        />

      )}

    </Group>

  </Grid.Col>
)}
      </Grid>

    <Title order={4} mb="sm">
        Leg Settings
      </Title>
          <Grid>


        {/* ENTRY TYPE */}


        <Grid.Col span={{ base: 12, md: 4 }}>
      <Card shadow="sm" p="lg">

        <Group justify="space-between">
          <span>Entry Type</span>
        </Group>

        <Select
          mt="md"
          data={["Time", "Current Price", "Limit Price"]}
          value={entryType}
          onChange={setEntryType}
        />

        {/* TIME INPUT */}
        {entryType === "Time" && (
          <TimeInput
            mt="md"
            label="Entry Time"
          />
        )}

        {/* LIMIT PRICE INPUT */}
        {entryType === "Limit Price" && (
          <TextInput
            mt="md"
            label="Value"
            placeholder="Enter Limit Price"
            type="number"
          />
        )}

        {/* CURRENT PRICE -> NOTHING */}
      </Card>
    </Grid.Col>

        {/* SL TYPE */}

        <Grid.Col span={{ base: 12, md: 4 }}>
      <Card shadow="sm" p="lg">

        <Group justify="space-between">
          <Text>SL Type</Text>
          <Switch
            checked={slEnabled}
            onChange={(e) => setSlEnabled(e.currentTarget.checked)}
          />
        </Group>

        {slEnabled && (
          <>
            <Select
              mt="md"
              value={slType}
              onChange={setSlType}
              data={[
                { label: "Time", value: "time" },
                { label: "Percentage", value: "percentage" },
                { label: "Limit Price", value: "limit" },
                { label: "MTM", value: "mtm" }
              ]}
            />

            {/* TIME */}
            {slType === "time" && (
              <TimeInput
                mt="md"
                label="Exit Time"
              />
            )}

            {/* LIMIT PRICE */}
            {slType === "limit" && (
              <TextInput
                mt="md"
                label="Limit Price"
                type="number"
                placeholder="Enter price"
              />
            )}

            {/* PERCENTAGE */}
            {slType === "percentage" && (
              <TextInput
                mt="md"
                label="Percentage"
                type="number"
                rightSection="%"
                placeholder="Enter %"
              />
            )}

            {/* MTM */}
            {slType === "mtm" && (
              <TextInput
                mt="md"
                label="MTM Value"
                type="number"
                placeholder="Enter MTM"
              />
            )}

            <Group mt="1rem" justify="space-between">
  <Text>Re-entry after SL</Text>
  <Switch
    checked={reentrySL}
    onChange={(e) => setReentrySL(e.currentTarget.checked)}
  />
</Group>

{reentrySL && (
  <NumberInput
    mt="sm"
    label="Re-entry Count"
    min={1}
    value={reentrySLCount}
    onChange={setReentrySLCount}
  />
)}
          </>
        )}

      </Card>
    </Grid.Col>
        {/* TARGET TYPE */}
        <Grid.Col span={{ base: 12, md: 4 }}>
      <Card shadow="sm" p="lg">

        <Group justify="space-between">
          <Text>Target Type</Text>
        </Group>

        <Select
          mt="md"
          value={targetType}
          onChange={setTargetType}
          data={[
            { label: "Time", value: "time" },
            { label: "MTM", value: "mtm" },
            { label: "Limit Price", value: "limit" },
            {label:"Percentage",value:"Percentage"}
          ]}
        />

        {/* TIME */}
        {targetType === "time" && (
          <TimeInput
            mt="md"
            label="Target Time"
          />
        )}

        {/* MTM */}
        {targetType === "mtm" && (
          <NumberInput
            mt="md"
            label="MTM Target"
            placeholder="Enter value"
          />
        )}

        {/* LIMIT PRICE */}
        {targetType === "limit" && (
          <NumberInput
            mt="md"
            label="Limit Price"
            placeholder="Enter price"
          />
        )}
        {targetType === "Percentage" && (
          <NumberInput
            mt="md"
            label="Percentage"
            placeholder="Enter percentage"
          />
        )}

        {/* REENTRY */}
        <Group mt="1rem" >
          <Text>Re-entry after Target</Text>
          <Switch
            checked={reentryTarget}
            onChange={(e) => setReentryTarget(e.currentTarget.checked)}
          />

        </Group>

        {reentryTarget && (
          <NumberInput
            mt="sm"
            label="Re-entry Count"
            min={1}
            value={reentryTargetCount}
            onChange={setReentryTargetCount}
          />
        )}

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
            
            <Group mt={"1rem"} ><Text>Re-entry after TSL</Text> <Switch/>
            <NumberInput label="Re-entry number" />
            </Group>

          </Card>
        </Grid.Col>

                  </Grid>


    </Card>
  );
}