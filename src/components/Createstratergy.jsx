import React, { useState } from 'react';
import { MantineProvider, Box, Container, Text, Group, Select, TextInput, Button, Grid, Divider, ScrollArea, Stack } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

const Createstratergy = () => {
   const [strategyData, setStrategyData] = useState({
    preBuilt: '',
    customStrategy: '',
    strategyName: '',
    underlying: '',
    capital: '100000',
    type: '',
    
    // Entry Settings
    entryHour: '09',
    entryMinute: '15',
    entryDays: '',
    
    // Exit Settings
    profitMTM: 'None',
    profitMTMValue: '',
    stoplossMMT: 'None',
    stoplossMTMValue: '',
    trailingStoploss: 'None',
    activateAt: '',
    lockProfitAt: '',
    whenProfitIncrease: '',
    increaseTSL: '',
    exitHour: '15',
    exitMinute: '10',
    exitOnExpiry: 'Yes',
    exitAfterEntry: '0',
    
    // Position
    segment: '',
    buySell: 'Select',
    strikeSelection: '',
    value: '',
    expiry: '',
    lots: '',
  });

  const [positions, setPositions] = useState([]);

  const handleChange = (field, value) => {
    setStrategyData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPosition = () => {
    const newPosition = {
      strike: '',
      value: '',
      expiry: '',
      segment: strategyData.segment,
      lots: strategyData.lots,
      tgt: '',
      tgtPercent: '',
      sl: '',
      slPercent: '',
    };
    setPositions([...positions, newPosition]);
  };
  return (
        <Box style={{ backgroundColor: '#ffffffff', minHeight: '100vh', padding: '20px' }}>
        <Stack size="xl" style={{ maxWidth: '1400px' }}>
          {/* Strategy Builder Header */}
          <Text size='1.5rem' fw={"600"} pb={"1rem"} >Stratergy Builder</Text>

          {/* Top Section - Pre Build, Create, Custom */}
          <Grid gutter="lg" mb="xl">
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Box>
                <Text size="sm" fw={600} mb={8} c="#212529">
                  Pre Build Strategies
                </Text>
                <Select
                  placeholder="Select Template"
                  data={['Select Template']}
                  value={strategyData.preBuilt}
                  onChange={(value) => handleChange('preBuilt', value)}
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      padding: '12px 14px',
                      height: '48px',
                      backgroundColor: 'white',
                    },
                  }}
                />
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Box>
                <Text size="sm" fw={600} mb={8} c="#212529">
                  Create
                </Text>
                <Button
                  fullWidth
                  variant="outline"
                  size="md"
                  style={{
                    borderColor: '#000000ff',
                    color: '#000000ff',
                    height: '48px',
                    fontSize: '15px',
                    fontWeight: 500,
                    borderRadius: '8px',
                  }}
                >
                  Create Own Strategy
                </Button>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Box>
                <Text size="sm" fw={600} mb={8} c="#212529">
                  Custom
                </Text>
                <Select
                  placeholder="My Strategies"
                  data={['My Strategies']}
                  value={strategyData.customStrategy}
                  onChange={(value) => handleChange('customStrategy', value)}
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      padding: '12px 14px',
                      height: '48px',
                      backgroundColor: 'white',
                    },
                  }}
                />
              </Box>
            </Grid.Col>
          </Grid>

          <Divider my="xl" />

          {/* Strategy Details */}
          <Grid gutter="lg" mb="xl">
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <TextInput
                label="Strategy"
                placeholder=""
                value={strategyData.strategyName}
                onChange={(e) => handleChange('strategyName', e.target.value)}
                styles={{
                  label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '15px',
                    padding: '12px 14px',
                    height: '48px',
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label="Underlying"
                placeholder="Select Underlying"
                data={['Select Underlying']}
                value={strategyData.underlying}
                onChange={(value) => handleChange('underlying', value)}
                styles={{
                  label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '15px',
                    padding: '12px 14px',
                    height: '48px',
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <TextInput
                label="Capital"
                value={strategyData.capital}
                onChange={(e) => handleChange('capital', e.target.value)}
                styles={{
                  label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '15px',
                    padding: '12px 14px',
                    height: '48px',
                    backgroundColor: '#e9ecef',
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label="Type"
                placeholder="Select Type"
                data={['Select Type']}
                value={strategyData.type}
                onChange={(value) => handleChange('type', value)}
                styles={{
                  label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '15px',
                    padding: '12px 14px',
                    height: '48px',
                  },
                }}
              />
            </Grid.Col>
          </Grid>

          {/* Positions Section */}
          <Box
            mb="xl"
            p="xl"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Text size="lg" fw={700} mb="lg" c="#212529">
              Positions
            </Text>
            
            <Grid gutter="md" mb="lg">
              <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                <Select
                  label="Segment"
                  placeholder="Select"
                  data={['Select']}
                  value={strategyData.segment}
                  onChange={(value) => handleChange('segment', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      height: '42px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                <Box>
                  <Text size="sm" fw={600} mb={8} c="#212529">
                    Buy/Sell
                  </Text>
                  <Button
                    fullWidth
                    variant="light"
                    style={{
                      backgroundColor: '#e9ecef',
                      color: '#495057',
                      height: '42px',
                      fontSize: '14px',
                      borderRadius: '8px',
                    }}
                  >
                    {strategyData.buySell}
                  </Button>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                <Select
                  label="Strike Selection"
                  placeholder="Select"
                  data={['Select']}
                  value={strategyData.strikeSelection}
                  onChange={(value) => handleChange('strikeSelection', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      height: '42px',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                <TextInput
                  label="Value"
                  placeholder=""
                  value={strategyData.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      height: '42px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                <Select
                  label="Expiry"
                  placeholder="Select"
                  data={['Select']}
                  value={strategyData.expiry}
                  onChange={(value) => handleChange('expiry', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      height: '42px',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 1.5 }}>
                <Select
                  label="Lots"
                  placeholder="Select"
                  data={['Select']}
                  value={strategyData.lots}
                  onChange={(value) => handleChange('lots', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      height: '42px',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 2 }} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button
                  w={"200px"}
                  onClick={handleAddPosition}
                  style={{
                    backgroundColor: '#000000ff',
                    height: '42px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    color:"#fff"
                  }}
                >
                  Add
                </Button>
              </Grid.Col>
            </Grid>
            <Divider mb={"1rem"} />

            {/* Position Table Headers */}

<div
  style={{
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  }}
>
  <Group
    gap="md"
    mb="sm"
    style={{
      fontSize: "14px",
      color: "#868e96",
      fontWeight: 600,
      display: "inline-flex",
      flexWrap: "wrap",
    }}
  >
    <Box style={{ width: 80 }}>Strike</Box>
    <Box style={{ width: 80 }}>Value</Box>
    <Box style={{ width: 80 }}>Expiry</Box>
    <Box style={{ width: 80 }}>Segment</Box>
    <Box style={{ width: 60 }}>Lots</Box>
    <Box style={{ width: 60 }}>TGT</Box>
    <Box style={{ width: 120 }}>% of Entry Price</Box>
    <Box style={{ width: 60 }}>SL</Box>
    <Box style={{ width: 120 }}>% of Entry Price</Box>
    <Box style={{ width: 60 }}>TRL</Box>
    <Box style={{ width: 120 }}>Entry %</Box>
  </Group>
</div>

          </Box>

          {/* Entry Setting */}
          <Box
            mb="xl"
            p="xl"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Text size="lg" fw={700} mb="lg" c="#212529">
              Entry Setting
            </Text>
            
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Text size="sm" fw={600} mb={8} c="#212529">
                  Entry Time (hh:mm)
                </Text>
                <Group gap="sm">
                  <Select
                    data={['09']}
                    value={strategyData.entryHour}
                    onChange={(value) => handleChange('entryHour', value)}
                    styles={{
                      input: {
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '15px',
                        height: '48px',
                        width: '80px',
                      },
                    }}
                  />
                  <Select
                    data={['15']}
                    value={strategyData.entryMinute}
                    onChange={(value) => handleChange('entryMinute', value)}
                    styles={{
                      input: {
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '15px',
                        height: '48px',
                        width: '80px',
                      },
                    }}
                  />
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Select
                  label="Enter on Days"
                  placeholder="days..."
                  data={['days...']}
                  value={strategyData.entryDays}
                  onChange={(value) => handleChange('entryDays', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                    },
                  }}
                />
              </Grid.Col>
            </Grid>
          </Box>

          {/* Exit Setting */}
          <Box
            p="xl"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Text size="lg" fw={700} mb="lg" c="#212529">
              Exit Setting
            </Text>
            
            <Grid gutter="lg" mb="lg">
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Select
                  label="Profit MTM"
                  data={['None']}
                  value={strategyData.profitMTM}
                  onChange={(value) => handleChange('profitMTM', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <TextInput
                  label=" "
                  value={strategyData.profitMTMValue}
                  onChange={(e) => handleChange('profitMTMValue', e.target.value)}
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Select
                  label="Stoploss MTM"
                  data={['None']}
                  value={strategyData.stoplossMMT}
                  onChange={(value) => handleChange('stoplossMMT', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <TextInput
                  label=" "
                  value={strategyData.stoplossMTMValue}
                  onChange={(e) => handleChange('stoplossMTMValue', e.target.value)}
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
            </Grid>

            <Grid gutter="lg" mb="lg">
              <Grid.Col span={{ base: 12, sm: 6, md: 2.4 }}>
                <Select
                  label="Trailing Stoploss"
                  data={['None']}
                  value={strategyData.trailingStoploss}
                  onChange={(value) => handleChange('trailingStoploss', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2.4 }}>
                <TextInput
                  label="Activate At"
                  value={strategyData.activateAt}
                  onChange={(e) => handleChange('activateAt', e.target.value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2.4 }}>
                <TextInput
                  label="Lock Profit At"
                  value={strategyData.lockProfitAt}
                  onChange={(e) => handleChange('lockProfitAt', e.target.value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2.4 }}>
                <TextInput
                  label="When Profit increase by"
                  value={strategyData.whenProfitIncrease}
                  onChange={(e) => handleChange('whenProfitIncrease', e.target.value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 2.4 }}>
                <TextInput
                  label="Increase TSL by"
                  value={strategyData.increaseTSL}
                  onChange={(e) => handleChange('increaseTSL', e.target.value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
            </Grid>

            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Text size="sm" fw={600} mb={8} c="#212529">
                  Exit Time (hh:mm)
                </Text>
                <Group gap="sm">
                  <Select
                    data={['15']}
                    value={strategyData.exitHour}
                    onChange={(value) => handleChange('exitHour', value)}
                    styles={{
                      input: {
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '15px',
                        height: '48px',
                        width: '80px',
                      },
                    }}
                  />
                  <Select
                    data={['10']}
                    value={strategyData.exitMinute}
                    onChange={(value) => handleChange('exitMinute', value)}
                    styles={{
                      input: {
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '15px',
                        height: '48px',
                        width: '80px',
                      },
                    }}
                  />
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Group gap="xs" mb={8}>
                  <Text size="sm" fw={600} c="#212529">
                    Exit On Expiry
                  </Text>
                  <IconInfoCircle size={16} color="#868e96" />
                </Group>
                <Select
                  data={['Yes']}
                  value={strategyData.exitOnExpiry}
                  onChange={(value) => handleChange('exitOnExpiry', value)}
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                      backgroundColor: '#e9ecef',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Select
                  label="Exit after Entry + x days"
                  data={['0']}
                  value={strategyData.exitAfterEntry}
                  onChange={(value) => handleChange('exitAfterEntry', value)}
                  styles={{
                    label: { color: '#212529', fontWeight: 600, marginBottom: '8px', fontSize: '14px' },
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      height: '48px',
                    },
                  }}
                />
              </Grid.Col>
            </Grid>
          </Box>
        </Stack>
        
      </Box>
  )
}

export default Createstratergy