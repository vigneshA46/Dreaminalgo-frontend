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
  SegmentedControl,
  Title
} from "@mantine/core";

import {
  IconCopy,
  IconTrash,
  IconInfoCircle
} from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";

export default function Leg({ leg, updateLeg } ) {
  const [marketType  ,setMarketType] = useState();

  const [targetProfit, setTargetProfit] = useState(false);
  const [stopLoss, setStopLoss] = useState(false);
  const [trailSL, setTrailSL] = useState(false);
  const [reentryTgt, setReentryTgt] = useState(false);
  const [reentrySL, setReentrySL] = useState(false);
  const [momentum, setMomentum] = useState(false);
  const [rangeBreakout, setRangeBreakout] = useState(false);
  const [entryType, setEntryType] = useState("Current Price");

const [slEnabled, setSlEnabled] = useState(false);
const [slType, setSlType] = useState("limit");

const [reentrySLCount, setReentrySLCount] = useState(1);

const [targetType, setTargetType] = useState("mtm");

const [reentryTarget, setReentryTarget] = useState(false);
const [reentryTargetCount, setReentryTargetCount] = useState(1);
const [targetEnabled, setTargetEnabled] = useState(false);
const [trailingEnabled, setTrailingEnabled] = useState(false);
const [reentryTSL, setReentryTSL] = useState(false);

  const expiryOptions =
    marketType === "futures"
      ? ["Current Month", "Next Month"]
  : ["This Week", "Next Week"];

  return (
    <Card shadow="xs" radius="md" p="lg" withBorder>

      {/* Header */}
      <Grid>
  <Grid.Col span={{ base: 12, md: 2 }}>
    <Text fw={500} size="0.9rem" mb="0.5rem">
      Market Type
    </Text>

    <SegmentedControl
      fullWidth
      value={leg.market_type}
      onChange={(value) =>
        updateLeg(leg.id, "market_type", value)
      }
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
    <NumberInput
      label="Lots"
      value={leg.lots}
      min={1}
      onChange={(value) => updateLeg(leg.id, "lots", value)}
    />
  </Grid.Col>

  <Grid.Col span={{ base: 12, md: 2 }}>
    <Select
      label="Position"
      data={["Buy", "Sell"]}
      value={leg.position}
      onChange={(value) =>
        updateLeg(leg.id, "position", value)
      }
    />
  </Grid.Col>

  {leg.market_type === "options" && (
    <Grid.Col span={{ base: 12, md: 2 }}>
      <Select
        label="Option Type"
        data={["Call", "Put"]}
        value={leg.option_type}
        onChange={(value) =>
          updateLeg(leg.id, "option_type", value)
        }
      />
    </Grid.Col>
  )}

  <Grid.Col span={{ base: 12, md: 2 }}>
    <Select
      label="Expiry"
      data={expiryOptions}
      value={leg.expiry}
      onChange={(value) =>
        updateLeg(leg.id, "expiry", value)
      }
    />
  </Grid.Col>

  {leg.market_type === "options" && (
    <Grid.Col span={{ base: 12, md: 3 }}>
      <Group align="center" gap={4}>
        <Text size="sm">Strike Price</Text>
        <IconInfoCircle size={14} />
      </Group>

      <TextInput
        type="number"
        value={leg.strike_price}
        onChange={(e) =>
          updateLeg(leg.id, "strike_price", e.target.value)
        }
      />
    </Grid.Col>
  )}

</Grid>
      <Title order={4} mb="sm">
        Leg Settings
      </Title>
    <Grid mb="1rem">
  <Grid.Col span={{ base: 12, md: 4 }}>
    <Card shadow="sm" p="lg">

      <Group justify="space-between">
        <span>Entry Type</span>
      </Group>

      <Select
        mt="md"
        data={[
          { label: "Time", value: "time" },
          { label: "Current Price", value: "current_price" },
          { label: "Limit Price", value: "limit" }
        ]}
        value={leg.entry.type}
        onChange={(value) =>
          updateLeg(leg.id, "entry.type", value)
        }
      />

      {/* TIME ENTRY */}
      {leg.entry.type === "time" && (
        <TimeInput
          mt="md"
          label="Entry Time"
          value={leg.entry.value || ""}
          onChange={(event) =>
            updateLeg(leg.id, "entry.value", event.target.value)
          }
        />
      )}

      {/* LIMIT PRICE ENTRY */}
      {leg.entry.type === "limit" && (
        <TextInput
          mt="md"
          label="Limit Price"
          type="number"
          placeholder="Enter Limit Price"
          value={leg.entry.value || ""}
          onChange={(e) =>
            updateLeg(leg.id, "entry.value", e.target.value)
          }
        />
      )}

      {/* CURRENT PRICE -> NO VALUE */}

    </Card>
  </Grid.Col>
</Grid>

          <Grid>


        

        {/* SL TYPE */}

<Grid.Col span={{ base: 12, md: 4 }}>
  <Card shadow="sm" p="lg">

    <Group justify="space-between">
      <Text>SL Type</Text>

      <Switch
        checked={leg.stoploss.enabled}
        onChange={(e) =>
          updateLeg(
            leg.id,
            "stoploss.enabled",
            e.currentTarget.checked
          )
        }
      />
    </Group>

    {leg.stoploss.enabled && (
      <>
        <Select
          mt="md"
          value={leg.stoploss.type}
          onChange={(value) =>
            updateLeg(leg.id, "stoploss.type", value)
          }
          data={[
            { label: "Time", value: "time" },
            { label: "Percentage", value: "percentage" },
            { label: "Limit Price", value: "limit" },
            { label: "MTM", value: "mtm" }
          ]}
        />

        {/* TIME */}
        {leg.stoploss.type === "time" && (
          <TimeInput
            mt="md"
            label="Exit Time"
            value={leg.stoploss.value || ""}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "stoploss.value",
                e.target.value
              )
            }
          />
        )}

        {/* LIMIT PRICE */}
        {leg.stoploss.type === "limit" && (
          <TextInput
            mt="md"
            label="Limit Price"
            type="number"
            placeholder="Enter price"
            value={leg.stoploss.value || ""}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "stoploss.value",
                e.target.value
              )
            }
          />
        )}

        {/* PERCENTAGE */}
        {leg.stoploss.type === "percentage" && (
          <TextInput
            mt="md"
            label="Percentage"
            type="number"
            rightSection="%"
            placeholder="Enter %"
            value={leg.stoploss.value || ""}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "stoploss.value",
                e.target.value
              )
            }
          />
        )}

        {/* MTM */}
        {leg.stoploss.type === "mtm" && (
          <TextInput
            mt="md"
            label="MTM Value"
            type="number"
            placeholder="Enter MTM"
            value={leg.stoploss.value || ""}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "stoploss.value",
                e.target.value
              )
            }
          />
        )}

        {/* REENTRY SWITCH */}
        <Group mt="1rem" justify="space-between">
          <Text>Re-entry after SL</Text>

          <Switch
            checked={leg.stoploss.reentry.enabled}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "stoploss.reentry.enabled",
                e.currentTarget.checked
              )
            }
          />
        </Group>

        {/* REENTRY COUNT */}
        {leg.stoploss.reentry.enabled && (
          <NumberInput
            mt="sm"
            label="Re-entry Count"
            min={1}
            value={leg.stoploss.reentry.count}
            onChange={(value) =>
              updateLeg(
                leg.id,
                "stoploss.reentry.count",
                value
              )
            }
          />
        )}
      </>
    )}
  </Card>
</Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
  <Card shadow="sm" p="lg">

    <Group justify="space-between">
      <Text>Target Type</Text>

      <Switch
        checked={leg.target.enabled}
        onChange={(e) =>
          updateLeg(
            leg.id,
            "target.enabled",
            e.currentTarget.checked
          )
        }
      />
    </Group>

    {leg.target.enabled && (
      <>
        <Select
          mt="md"
          value={leg.target.type}
          onChange={(value) =>
            updateLeg(leg.id, "target.type", value)
          }
          data={[
            { label: "Time", value: "time" },
            { label: "MTM", value: "mtm" },
            { label: "Limit Price", value: "limit" },
            { label: "Percentage", value: "percentage" }
          ]}
        />

        {/* TIME */}
        {leg.target.type === "time" && (
          <TimeInput
            mt="md"
            label="Target Time"
            value={leg.target.value || ""}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "target.value",
                e.target.value
              )
            }
          />
        )}

        {/* MTM */}
        {leg.target.type === "mtm" && (
          <NumberInput
            mt="md"
            label="MTM Target"
            placeholder="Enter value"
            value={leg.target.value || ""}
            onChange={(value) =>
              updateLeg(leg.id, "target.value", value)
            }
          />
        )}

        {/* LIMIT PRICE */}
        {leg.target.type === "limit" && (
          <NumberInput
            mt="md"
            label="Limit Price"
            placeholder="Enter price"
            value={leg.target.value || ""}
            onChange={(value) =>
              updateLeg(leg.id, "target.value", value)
            }
          />
        )}

        {/* PERCENTAGE */}
        {leg.target.type === "percentage" && (
          <NumberInput
            mt="md"
            label="Percentage"
            placeholder="Enter percentage"
            value={leg.target.value || ""}
            onChange={(value) =>
              updateLeg(leg.id, "target.value", value)
            }
          />
        )}

        {/* REENTRY SWITCH */}
        <Group mt="1rem" justify="space-between">
          <Text>Re-entry after Target</Text>

          <Switch
            checked={leg.target.reentry.enabled}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "target.reentry.enabled",
                e.currentTarget.checked
              )
            }
          />
        </Group>

        {/* REENTRY COUNT */}
        {leg.target.reentry.enabled && (
          <NumberInput
            mt="sm"
            label="Re-entry Count"
            min={1}
            value={leg.target.reentry.count}
            onChange={(value) =>
              updateLeg(
                leg.id,
                "target.reentry.count",
                value
              )
            }
          />
        )}
      </>
    )}
  </Card>
</Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
  <Card shadow="sm" p="lg">

    <Group justify="space-between">
      <Text>Trailing Options</Text>

      <Switch
        checked={leg.trailing.enabled}
        onChange={(e) =>
          updateLeg(
            leg.id,
            "trailing.enabled",
            e.currentTarget.checked
          )
        }
      />
    </Group>

    {leg.trailing.enabled && (
      <>
        <Select
          mt="md"
          data={[
            { label: "MTM", value: "mtm" },
            { label: "Points", value: "points" },
            { label: "Percentage", value: "percentage" }
          ]}
          value={leg.trailing.type}
          onChange={(value) =>
            updateLeg(leg.id, "trailing.type", value)
          }
        />

        <NumberInput
          mt="sm"
          label="TSL Active"
          placeholder="0"
          value={leg.trailing.tsl_active || ""}
          onChange={(value) =>
            updateLeg(leg.id, "trailing.tsl_active", value)
          }
        />

        <NumberInput
          mt="sm"
          label="SL Position"
          placeholder="1"
          value={leg.trailing.sl_position || ""}
          onChange={(value) =>
            updateLeg(leg.id, "trailing.sl_position", value)
          }
        />

        <NumberInput
          mt="sm"
          label="Trail Value"
          placeholder="1"
          value={leg.trailing.trail_value || ""}
          onChange={(value) =>
            updateLeg(leg.id, "trailing.trail_value", value)
          }
        />

        <Group mt="1rem" justify="space-between">
          <Text>Re-entry after TSL</Text>

          <Switch
            checked={leg.trailing.reentry.enabled}
            onChange={(e) =>
              updateLeg(
                leg.id,
                "trailing.reentry.enabled",
                e.currentTarget.checked
              )
            }
          />
        </Group>

        {leg.trailing.reentry.enabled && (
          <NumberInput
            mt="sm"
            label="Re-entry number"
            min={1}
            value={leg.trailing.reentry.count}
            onChange={(value) =>
              updateLeg(
                leg.id,
                "trailing.reentry.count",
                value
              )
            }
          />
        )}
      </>
    )}

  </Card>
</Grid.Col>

                  </Grid>

    </Card>
  );
}
 