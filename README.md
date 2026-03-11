# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


₹



/// trader signal

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
















/// create stratergy


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






////leg builder code while reminving the builder component

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