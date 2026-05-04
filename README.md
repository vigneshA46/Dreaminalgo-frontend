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






    ////current options in the leg 

    
      {/* Profit / SL */}
      <Grid mt="md">
{/* 
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="space-between">
            <Text size="sm">Target Profit</Text>
            <Switch
              checked={targetProfit}
              onChange={(e) => setTargetProfit(e.currentTarget.checked)}
            />
          </Group>

          {targetProfit && (
            <Group mt="xs">
              <Select data={["Points (Pts)", "Percent"]} defaultValue="Points (Pts)" />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col> */}

{/*         <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="space-between">
            <Text size="sm">Stop Loss</Text>
            <Switch
              checked={stopLoss}
              onChange={(e) => setStopLoss(e.currentTarget.checked)}
            />
          </Group>

          {stopLoss && (
            <Group mt="xs">
              <Select data={["Points (Pts)", "Percent"]} defaultValue="Points (Pts)" />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col> */}
{/* 
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="space-between">
            <Group gap={4}>
              <Text size="sm">Trail SL</Text>
              <IconInfoCircle size={14} />
            </Group>

            <Switch
              checked={trailSL}
              onChange={(e) => setTrailSL(e.currentTarget.checked)}
            />
          </Group>

          {trailSL && (
            <Group mt="xs">
              <Select data={["Points"]} defaultValue="Points" />
              <NumberInput placeholder="0" />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col> */}

      </Grid>

      {/* Advanced Settings */}
      <Grid mt="md">

        {/* <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Text size="sm">Re-entry on Tgt</Text>
            <Switch
              checked={reentryTgt}
              onChange={(e) => setReentryTgt(e.currentTarget.checked)}
            />
          </Group>

          {reentryTgt && (
            <Group mt="xs">
              <Select data={["RE ASAP"]} defaultValue="RE ASAP" />
              <NumberInput defaultValue={1} />
            </Group>
          )}
        </Grid.Col> */}

{/*         <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Text size="sm">Re-entry on SL</Text>
            <Switch
              checked={reentrySL}
              onChange={(e) => setReentrySL(e.currentTarget.checked)}
            />
          </Group>

          {reentrySL && (
            <Group mt="xs">
              <Select data={["RE ASAP"]} defaultValue="RE ASAP" />
              <NumberInput defaultValue={1} />
            </Group>
          )}
        </Grid.Col> */}

{/*         <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Group gap={4}>
              <Text size="sm">Simple Momentum</Text>
              <IconInfoCircle size={14} />
            </Group>

            <Switch
              checked={momentum}
              onChange={(e) => setMomentum(e.currentTarget.checked)}
            />
          </Group>

          {momentum && (
            <Group mt="xs">
              <Select data={["Points (Pts) ↑"]} />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col> */}

        {/* <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Text size="sm">Range Breakout</Text>
            <Switch
              checked={rangeBreakout}
              onChange={(e) => setRangeBreakout(e.currentTarget.checked)}
            />
          </Group>

          {rangeBreakout && (
            <Group mt="xs">
              <TextInput placeholder="09:45" />
              <Select data={["High", "Low"]} defaultValue="High" />
              <Select data={["Strike Price"]} />
            </Group>
          )}
        </Grid.Col> */}

      </Grid>




//// create stratergy old leg

      {/* Profit / SL */}
      <Grid mt="md">

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="space-between">
            <Text size="sm">Target Profit</Text>
            <Switch
              checked={targetProfit}
              onChange={(e) => setTargetProfit(e.currentTarget.checked)}
            />
          </Group>

          {targetProfit && (
            <Group mt="xs">
              <Select data={["Points (Pts)", "Percent"]} defaultValue="Points (Pts)" />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="space-between">
            <Text size="sm">Stop Loss</Text>
            <Switch
              checked={stopLoss}
              onChange={(e) => setStopLoss(e.currentTarget.checked)}
            />
          </Group>

          {stopLoss && (
            <Group mt="xs">
              <Select data={["Points (Pts)", "Percent"]} defaultValue="Points (Pts)" />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="space-between">
            <Group gap={4}>
              <Text size="sm">Trail SL</Text>
              <IconInfoCircle size={14} />
            </Group>

            <Switch
              checked={trailSL}
              onChange={(e) => setTrailSL(e.currentTarget.checked)}
            />
          </Group>

          {trailSL && (
            <Group mt="xs">
              <Select data={["Points"]} defaultValue="Points" />
              <NumberInput placeholder="0" />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col>

      </Grid>

      {/* Advanced Settings */}
      <Grid mt="md">

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Text size="sm">Re-entry on Tgt</Text>
            <Switch
              checked={reentryTgt}
              onChange={(e) => setReentryTgt(e.currentTarget.checked)}
            />
          </Group>

          {reentryTgt && (
            <Group mt="xs">
              <Select data={["RE ASAP"]} defaultValue="RE ASAP" />
              <NumberInput defaultValue={1} />
            </Group>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Text size="sm">Re-entry on SL</Text>
            <Switch
              checked={reentrySL}
              onChange={(e) => setReentrySL(e.currentTarget.checked)}
            />
          </Group>

          {reentrySL && (
            <Group mt="xs">
              <Select data={["RE ASAP"]} defaultValue="RE ASAP" />
              <NumberInput defaultValue={1} />
            </Group>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Group gap={4}>
              <Text size="sm">Simple Momentum</Text>
              <IconInfoCircle size={14} />
            </Group>

            <Switch
              checked={momentum}
              onChange={(e) => setMomentum(e.currentTarget.checked)}
            />
          </Group>

          {momentum && (
            <Group mt="xs">
              <Select data={["Points (Pts) ↑"]} />
              <NumberInput placeholder="0" />
            </Group>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Group justify="space-between">
            <Text size="sm">Range Breakout</Text>
            <Switch
              checked={rangeBreakout}
              onChange={(e) => setRangeBreakout(e.currentTarget.checked)}
            />
          </Group>

          {rangeBreakout && (
            <Group mt="xs">
              <TextInput placeholder="09:45" />
              <Select data={["High", "Low"]} defaultValue="High" />
              <Select data={["Strike Price"]} />
            </Group>
          )}
        </Grid.Col>

      </Grid>







# dashboard codes



   {/*    <Grid gutter="lg" mb="xl">
      {indices.map((item) => (
        <Grid.Col span="auto" key={item.name}>
          <Stack
            style={{
              border: "1.5px solid #d6d6d6ff",
              borderLeft: "3px solid #2563eb",
              padding: "0.5rem",
              borderRadius: "0.3rem",
              background: "#fff",
              minWidth: "140px",
            }}
          >
            <Text fw={600}>{item.label}</Text>

            <Flex gap="0.4rem">
              <Text size="0.9rem" fw={600}>
                {Livestock[item.name] ?? "-"}
              </Text>
            </Flex>
          </Stack>
        </Grid.Col>
      ))}
    </Grid>
 */}

{/*   <Grid.Col span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
    <StatCard
      icon={IconChartBar}
      title="Total Trades"
      value="73"
      subtitle="48 wins, 25 losses"
    />
  </Grid.Col>
 */}




    {/* 
          <SimpleGrid
        cols={5}
        spacing="lg"
        mb="xl"
        breakpoints={[
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        ]}
      >
     <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>NIFTY50</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"red"} fw={600}>
          22333.2
        </Text>
        <Text size="0.8rem" fw={600}>
          -12.34 
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>BANKNIFTY</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"red"} fw={600}>
         48754.6
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid green",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>FINNIFTY</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"green"} fw={600}>
          48754.6
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid green",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text fw={600}>SENSEX</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"green"} fw={600}>
          19640.5
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
         <Stack
      style={{
        border: "1.5px solid #d6d6d6ff",
        borderLeft: "3px solid red",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        background: "#fff",
        minWidth: "140px",
      }}
    >
      <Text >MIDCAP</Text>

      <Flex gap="0.4rem">
        <Text size="0.8rem" c={"red"} fw={600}>
          73120.8
        </Text>
        <Text size="0.8rem" fw={600}>
          +$44
        </Text>
      </Flex>
    </Stack>
    </SimpleGrid> */}

      {/* Stats Grid */}
{/*       <SimpleGrid
        cols={4}
        spacing="lg"
        mb="xl"
        breakpoints={[
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        ]}
      >
        <StatCard
          icon={IconCurrencyDollar}
          title="Portfolio Value"
          value="₹125,847"
          change="+28.5% total return"
        />
        <StatCard
          icon={IconActivity}
          title="Active Strategies"
          value="3"
          subtitle="8 total created"
        />
        <StatCard
          icon={IconChartBar}
          title="Total Trades"
          value="73"
          subtitle="48 wins, 25 losses"
        />
        <Paper
          p="md"
          radius="md"
           style={{
        border : '1.5px solid #d6d6d6ff',
        borderRadius : '10px'
      }}
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            height: '100%',
          }}
        >
            <Flex align="center" gap="1rem" >
          <Group position="apart" mb="xs">
            <ThemeIcon size="lg" variant="light" color="gray">
              <IconAlertTriangle size={20} stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text size="sm" color="dimmed" weight={500}>
            Risk Score
          </Text>
          </Flex>
          <Text size="xl" weight={700} mt="xs" color="orange">
            Medium
          </Text>
          <Text size="xs" color="dimmed" mt={4}>
            Portfolio diversity: 85%
          </Text>
        </Paper>
      </SimpleGrid> */}



 {/*           <Table.Td>
  {
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    }).format(new Date(trade.timestamp))
  }
</Table.Td> */}




// table body removed from paper ui


              <Table.Tbody>
  {startergies.length > 0 ? (
    
    startergies.map((strategy, index) => {
      const isToday = selectedDate[strategy.id] === dayjs().format("YYYY-MM-DD");

      const displayPnl = liveData[strategy.id]?.pnl ? liveData[strategy.id]?.pnl
      : cumulativePnl[strategy.id] ? cumulativePnl[strategy.id] : strategy.latest_cum_pnl;
      return(
      <React.Fragment key={strategy.id}>
    <Table.Tr>
      <Table.Td>{index + 1}</Table.Td>

      <Table.Td fw={"500"} >{strategy.name} - {strategy.state_id}</Table.Td>

      {/* <Table.Td>-</Table.Td> */}

      <Table.Td>
  {liveData[strategy.id]?.status || "CLOSED"}
</Table.Td>




<Table.Td
  style={{
    color: displayPnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 600
  }}
>
  {formatPnl(displayPnl)}
</Table.Td>
      {/* ACTION COLUMN */}
      <Table.Td>
        <ActionIcon
          variant="subtle"
          onClick={() => handleRowToggle(strategy.id)}
        >
          {openedRow === strategy.id ? (
            <IconChevronUp size={18} />
          ) : (
            <IconChevronDown size={18} />
          )}
        </ActionIcon>
      </Table.Td>

      <Table.Td>
        <Button size='xs' radius={"1rem"} onClick={()=>fetchstatistics(strategy.id)} bg={"#000"} >Statistics</Button>
      </Table.Td>
    </Table.Tr>

    {/* EXPANDED ROW */}
    {openedRow === strategy.id && (
      <>
      <Select
  label="Select Date"
  placeholder="Pick date"
  value={selectedDate[strategy.id] || null}
  data={(dates[strategy.id] || []).map((d, i) => {
  const pnl = dateWisePnL?.[strategy.id]?.[d] ?? 0;

  return {
    value: d,
    label: `${i + 1} ${dayjs(d).format("DD-MM-YYYY")} (₹ ${pnl.toFixed(2)})`
  };
})}


  onChange={(value) => {
    setSelectedDate((prev) => ({
      ...prev,
      [strategy.id]: value,
    }));

    fetchLegsByDate(strategy.id, value);
  }}

  opened={dropdownOpened}
  onDropdownOpen={() => setDropdownOpened(true)}
  onDropdownClose={() => setDropdownOpened(false)}

  comboboxProps={{
  withinPortal: true,
  keepMounted: true
}}
  mb="md"
/>
  <Table.Tr>
    <Table.Td colSpan={7}>
      <Box  style={{ background: "#f8f9fa", borderRadius: "8px" }}>
        
        <Table
          horizontalSpacing="md"
          verticalSpacing="sm"
          style={{ width: "100%" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Symbol</Table.Th>
              {/* <Table.Th>QTY</Table.Th> */}
              <Table.Th>LTP ₹</Table.Th>
              <Table.Th>P&L ₹</Table.Th>
              <Table.Th>Val ₹</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
  {legs[strategy.id]?.length > 0 ? (
    legs[strategy.id].map((leg, i) => {

      const isToday = selectedDate[strategy.id] === dayjs().format("YYYY-MM-DD");
      
    const ltp = isToday
  ? (leg.leg === "CE"
      ? liveData[strategy.id]?.ce_ltp
      : liveData[strategy.id]?.pe_ltp)
  : "-"; // or store historical LTP if needed


    const pnl = isToday
  ? (leg.leg === "CE"
      ? liveData[strategy.id]?.ce_pnl
      : liveData[strategy.id]?.pe_pnl)
  : legPnls[strategy.id]?.[leg.token]?.pnl;

    const qty = 0;

    const val = qty * (ltp || 0);

      return (
        <Table.Tr key={leg.leg}>
          <Table.Td>{i + 1}</Table.Td>

          <Table.Td>
            <Text
    fw={500}
    style={{ cursor: "pointer", color: "#228be6" }}
    onClick={() => {

      const token = leg.token; // ✅ FIXED
      const date = selectedDate[strategy.id];

      setSelectedLegInfo({
        strategyId: strategy.id,
        token,
        date,
        leg: leg.leg
      });

      fetchTradesByToken(strategy.id, date, token);
    }}
  >
    {leg.symbol}
  </Text>
            <Text size="xs" c="dimmed">
              {leg.leg}
            </Text>
          </Table.Td>

          {/* <Table.Td>{qty}</Table.Td> */}

<Table.Td>{ltp ?? "-"}</Table.Td>

<Table.Td
  style={{
    color: pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 500
  }}
>
  {formatPnl(pnl)}
</Table.Td>

<Table.Td>{val.toFixed(2)}</Table.Td>
        </Table.Tr>
      );
    })
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={6}
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#868e96"
        }}
      >
        No Legs found
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
        </Table>
      </Box>
    </Table.Td>
  </Table.Tr>
  </>
)}
  </React.Fragment>
      )
})
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={7}
        style={{ textAlign: "center", padding: "60px", color: "#adb5bd" }}
      >
        <Text size="sm">No strategies available</Text>
      </Table.Td>
    </Table.Tr>
  )}
              </Table.Tbody>





////entire liveUI



const LiveUI = ()=>{
  return(
      <Box
  style={{
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    width: "100%",
  }}
>
  {/* Scrollable container */}
  <ScrollArea  w={isMobile? '100vw':'100%'}
  type="auto"
  scrollbarSize={6}
  offsetScrollbars>
            <Table
              w={isMobile? '100vw': '100%'}
              horizontalSpacing="md"
              verticalSpacing="md"
          /*     stickyHeader 
              stickyHeaderOffset={0} */
              style={{
                minWidth: '900px',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Strategy Name
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    O | T | M O
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Status
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    PNL
                  </Table.Th>
                   <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Broker
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Details
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
  {deployedStrategies.length > 0 ? (
    deployedStrategies.map((strategy, index) => (
  <React.Fragment key={strategy.id}>
    <Table.Tr>
      <Table.Td>{index + 1}</Table.Td>

      <Table.Td>{strategy.name} - {strategy.state_id}</Table.Td>

      <Table.Td>-</Table.Td>

      <Table.Td>
  {liveData[strategy.id]?.status || "CLOSED"}
</Table.Td>

      <Table.Td
  style={{
    color: liveData[strategy.id]?.pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 600
  }}
>
  {liveData[strategy.id]?.pnl ?? "-"}
</Table.Td>
  <Table.Td>
  {deploymentMap[strategy.id]?.join(", ") || "-"}
</Table.Td>

      {/* ACTION COLUMN */}
      <Table.Td>
        <ActionIcon
          variant="subtle"
          onClick={() => handleRowToggle(strategy.id)}
        >
          {openedRow === strategy.id ? (
            <IconChevronUp size={18} />
          ) : (
            <IconChevronDown size={18} />
          )}
        </ActionIcon>
      </Table.Td>

      <Table.Td>-</Table.Td>
    </Table.Tr>

    {/* EXPANDED ROW */}
    {openedRow === strategy.id && (
      <>
      <Select
  label="Select Date"
  placeholder="Pick date"
  value={selectedDate[strategy.id] || null}
  data={(dates[strategy.id] || []).map((d) => ({
    value: d,
    label: d,
  }))}


  onChange={(value) => {
    setSelectedDate((prev) => ({
      ...prev,
      [strategy.id]: value,
    }));

    fetchLegsByDate(strategy.id, value);
  }}

  opened={dropdownOpened}
  onDropdownOpen={() => setDropdownOpened(true)}
  onDropdownClose={() => setDropdownOpened(false)}

  comboboxProps={{
  withinPortal: true,
  keepMounted: true
}}
  mb="md"
/>
  <Table.Tr>
    <Table.Td colSpan={7}>
      <Box  style={{ background: "#f8f9fa", borderRadius: "8px" }}>
        
        <Table
          horizontalSpacing="md"
          verticalSpacing="sm"
          style={{ width: "100%" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>QTY</Table.Th>
              <Table.Th>LTP ₹</Table.Th>
              <Table.Th>P&L ₹</Table.Th>
              <Table.Th>Val ₹</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
  {legs[strategy.id]?.length > 0 ? (
    legs[strategy.id].map((leg, i) => {
      
      const ltp =
  leg.leg === "CE"
    ? liveData[strategy.id]?.ce_ltp
    : liveData[strategy.id]?.pe_ltp;

    const pnl =
  leg.leg === "CE"
    ? liveData[strategy.id]?.ce_pnl
    : liveData[strategy.id]?.pe_pnl;

    const qty = 0;

    const val = qty * (ltp || 0);

      return (
        <Table.Tr key={leg.leg}>
          <Table.Td>{i + 1}</Table.Td>

          <Table.Td>
            <Text
    fw={500}
    style={{ cursor: "pointer", color: "#228be6" }}
    onClick={() => {

      const token = leg.token; // ✅ FIXED
      const date = selectedDate[strategy.id];

      setSelectedLegInfo({
        strategyId: strategy.id,
        token,
        date,
        leg: leg.leg
      });

      fetchTradesByToken(strategy.id, date, token);
    }}
  >
    {leg.symbol}
  </Text>
            <Text size="xs" c="dimmed">
              {leg.leg}
            </Text>
          </Table.Td>

          <Table.Td>{qty}</Table.Td>

<Table.Td>{ltp ?? "-"}</Table.Td>

<Table.Td
  style={{
    color: pnl >= 0 ? "#16a34a" : "#dc2626",
    fontWeight: 500
  }}
>
  {pnl ?? "-"}
</Table.Td>

<Table.Td>{val.toFixed(2)}</Table.Td>
        </Table.Tr>
      );
    })
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={6}
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#868e96"
        }}
      >
        No Legs found
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
        </Table>
      </Box>
    </Table.Td>
  </Table.Tr>
  </>
)}
  </React.Fragment>
))
  ) : (
    <Table.Tr>
      <Table.Td
        colSpan={7}
        style={{ textAlign: "center", padding: "60px", color: "#adb5bd" }}
      >
        <Text size="sm">No strategies available</Text>
      </Table.Td>
    </Table.Tr>
  )}
</Table.Tbody>
            </Table>
            </ScrollArea>

            {/* Pagination */}
            <Group justify="flex-end" mt="xl">
              <Pagination
                total={1}
                value={1}
                onChange={() => {}}
                size="sm"
                styles={{
                  control: {
                    border: '1px solid #000',
                    borderRadius: '6px',
                    '&[data-active]': {
                      backgroundColor: '#000',
                      borderColor: '#000',
                    },
                  },
                }}
              />
            </Group>
          </Box>
  )
}
