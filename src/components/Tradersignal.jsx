import { Box, Button, Card, Container, Divider, Flex, Grid, Group, NumberInput, SegmentedControl, Select, Switch, Text, TextInput, Title } from '@mantine/core'
import React from 'react'

const Tradersignal = () => {
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
                        <TextInput label="Strike Price" type='number' placeholder='Strike Price' />
                      </Grid.Col>
                    </Grid>
            
                    <Group justify="center" mt="md">
                      <Button bg={"#000"}  >Add Leg</Button>
                    </Group>
            
                  </Card>

                    <Title order={4} mb="sm">
        Overall Signal Settings
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
              data={["Time", "Current Price","Limit Price"]}
              defaultValue="Max Loss"
            />
            <TextInput placeholder='Value' label="value" type='number' />

          </Card>
        </Grid.Col>

        {/* SL TYPE */}

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg">

            <Group justify="space-between">
              <span>SL Type</span>
              <Switch />
            </Group>

            <Select
              mt="md"
              data={["Limit Price", "MTM"]}
              defaultValue="Max Loss"
            />
            <TextInput placeholder='Value' label="value" type='number' />

            <Group mt={"1rem"} ><Text>Re-entry after SL</Text> <Switch/></Group>
            
          </Card>
        </Grid.Col>
        {/* TARGET TYPE */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg">

            <Group justify="space-between">
              <span>Target Type</span>
            </Group>

            <Select
              mt="md"
              data={["Time", "MTM","Limit Price"]}
              defaultValue="Max Loss"
            />
            <TextInput placeholder='Value' label="value" type='number' />
            <Group mt={"1rem"} ><Text>Re-entry after Target</Text> <Switch/></Group>
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
                  <Flex align={"center"} justify={"center"} my={"2rem"} >
                  <Button bg={"#000"}  >Save Signal</Button>
                  </Flex>

    </Container>
  )
}

export default Tradersignal