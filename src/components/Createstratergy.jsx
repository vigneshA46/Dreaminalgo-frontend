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
  Text
} from "@mantine/core";

export default function CreateStrategy() {

  return (
    <Container size="xl" py="md">

      <Title order={3} pb={"1rem"} >Create Startergy</Title>
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

            <SegmentedControl
              mt="md"
              fullWidth
              data={[
                { label: "Cash", value: "cash" },
                { label: "Futures", value: "futures" }
              ]}
            />

          </Card>
        </Grid.Col>

        {/* ENTRY SETTINGS */}

        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card shadow="sm" p="lg">

            <Title order={5} mb="md">
              Entry settings
            </Title>

            <SegmentedControl
              fullWidth
              data={[
                { label: "Intraday", value: "intraday" },
                { label: "BTST", value: "btst" },
                { label: "Positional", value: "positional" }
              ]}
            />

            <Grid mt="md">

              <Grid.Col span={6}>
                <TextInput label="Entry Time" placeholder="09:35" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput label="Exit Time" placeholder="15:15" />
              </Grid.Col>

            </Grid>

            <Group mt="md">
              <Switch label="No re-entry after" />
            </Group>

            <Divider my="md" />

            <Group justify="space-between">
              <span>Overall Momentum</span>
              <Switch />
            </Group>

            <Group mt="sm">

              <Select
                data={["Points (Pts)", "Percentage"]}
                defaultValue="Points (Pts)"
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
      <Card shadow="sm" p="lg" mb="lg">

        <Group justify="space-between" mb="md">
          <Title order={4}>Leg Builder</Title>
        </Group>

        <Grid>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Text fw={"500"} size="0.9rem" mb={"0.5rem"} >Market Type</Text>  
            <SegmentedControl
              fullWidth
              data={[
                { label: "Futures", value: "futures" },
                { label: "Options", value: "options" }
              ]}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 1 }}>
            <NumberInput label="Total Lot" defaultValue={1} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Text fw={"500"} size="0.9rem" mb={"0.5rem"} >Position</Text>
            <SegmentedControl
              fullWidth
              data={[
                { label: "Buy", value: "buy" },
                { label: "Sell", value: "sell" }
              ]}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Text fw={"500"} size="0.9rem" mb={"0.5rem"} >Option Type</Text>
            <SegmentedControl
              fullWidth
              data={[
                { label: "Call", value: "call" },
                { label: "Put", value: "put" }
              ]}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Select
              label="Expiry"
              data={["Weekly", "Monthly"]}
              defaultValue="Weekly"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Select
              label="Strike Criteria"
              data={["Strike Type", "Premium", "Points"]}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 1 }}>
            <Select
              label="Strike Type"
              data={["ATM", "ITM", "OTM"]}
              defaultValue="ATM"
            />
          </Grid.Col>

        </Grid>

        <Group justify="center" mt="md">
          <Button bg={"#000"}  >Add Leg</Button>
        </Group>

      </Card>

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

      

    </Container>
  );
}