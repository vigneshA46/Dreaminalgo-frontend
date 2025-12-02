
import React from 'react';
import { MantineProvider, Box, Container, Grid, Card, Text, Group, Badge, Button, List, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const Planandpricing = () => {
      const plans = [
    {
      name: 'Basic',
      price: '2000',
      period: '/ Month',
      save: 'Save 0%',
      comparison: 'vs our monthly plan',
      comparisonPrice: '₹9000',
      validity: 'Validity 30 Days',
      features: [
        'All Segment Trading',
        'Engineer Support',
        'Learning Videos',
      ],
      buttonText: 'BASIC BUY NOW',
      isDark: false,
      priceColor: '#212529',
    },
    {
      name: 'Pro',
      price: '3600',
      period: '/ Quarterly',
      save: 'Save 40%',
      comparison: 'vs our monthly plan',
      comparisonPrice: '₹6000',
      validity: 'Validity 90 Days',
      features: [
        'All Segment Trading',
        'Engineer Support',
        'Learning Videos',
      ],
      buttonText: 'BUY NOW',
      isDark: false,
      priceColor: '#212529',
    },
    {
      name: 'Premium',
      price: '12000',
      period: '/ Half Yearly',
      save: 'Save 0%',
      comparison: 'vs our monthly plan',
      comparisonPrice: '₹12000',
      validity: 'Validity 180 Days',
      features: [
        'All Segment Trading',
        'Engineer Support',
        'Learning Videos',
        'Make Your Own Strategy',
        'Expert Weekend Trading Training',
      ],
      buttonText: 'BUY NOW',
      isDark: true,
      priceColor: 'white',
    },
    {
      name: 'Extra Plan',
      price: '24000',
      period: '/ Annually',
      save: '',
      subtitle: 'Cost-Effective, Full Service',
      comparison: '',
      comparisonPrice: '',
      validity: 'Validity 365 Days',
      features: [
        'All Segment Trading',
        'Engineer Support',
        'Learning Videos',
        'Make Your Own Strategy',
        'Expert Weekend Trading Training',
      ],
      buttonText: 'BUY NOW',
      isDark: false,
      priceColor: '#212529',
    },
  ];

  return (
          <Box style={{ backgroundColor: '#ffffffff', minHeight: '100vh' }}>
            <Text size='1.5rem' fw={"600"} pb={"2rem"} >Plans and Pricing</Text>
        <Container size="xl" style={{ maxWidth: '1400px' }}>
          {/* Status Cards */}
{/*           <Grid gutter="lg" mb="xl">
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  borderLeft: '4px solid #dc3545',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <Text size="sm" c="#868e96" mb={4}>
                  Plan Status :
                </Text>
                <Text size="lg" fw={600} c="#dc3545">
                  Subscription Inactive
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  borderLeft: '4px solid #dc3545',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box>
                    <Text size="sm" c="#868e96" mb={4}>
                      Plan Expiry :
                    </Text>
                    <Text size="lg" fw={600} c="#dc3545">
                      2025-11-26
                    </Text>
                  </Box>
                  <Text size="sm" c="#868e96">
                    (6 Days ago)
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  borderLeft: '4px solid #1864ab',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box>
                    <Text size="sm" c="#868e96" mb={4}>
                      Demo Expiry :
                    </Text>
                    <Text size="lg" fw={600} c="#1864ab">
                      2026-06-14
                    </Text>
                  </Box>
                  <Text size="sm" c="#868e96">
                    (193 Days Left)
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          </Grid> */}

          {/* Pricing Cards */}
          <Grid  justify='center' gutter="lg" mb="xl">
            {plans.map((plan, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                <Card
                  
                  radius="md"
                  style={{
                    backgroundColor: plan.isDark ? '#1e2952' : 'white',
                    border: plan.isDark ? 'none' : '1px solid #e9ecef',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Plan Name */}
                  <Text
                    size="xl"
                    fw={600}
                    ta="center"
                    mb="lg"
                    c={plan.isDark ? 'white' : '#212529'}
                  >
                    {plan.name}
                  </Text>

                  {/* Price */}
                  <Group gap={4} justify="center" mb="xs">
                    <Text size="xl" fw={700} c={plan.priceColor}>
                      ₹{plan.price}
                    </Text>
                    <Text size="sm" c={plan.isDark ? '#b8c4d9' : '#868e96'}>
                      {plan.period}
                    </Text>
                  </Group>

                  {/* Subtitle or Save */}
                  {plan.subtitle ? (
                    <Text size="sm" ta="center" c="#868e96" mb="md">
                      {plan.subtitle}
                    </Text>
                  ) : (
                    <Text
                      size="sm"
                      ta="center"
                      c={plan.save.includes('0%') ? '#ffc107' : '#28a745'}
                      fw={600}
                      mb={4}
                    >
                      {plan.save}
                    </Text>
                  )}

                  {/* Comparison */}
                  {plan.comparison && (
                    <Group gap="xs" justify="center" mb="xl">
                      <Text size="xs" c={plan.isDark ? '#b8c4d9' : '#868e96'}>
                        {plan.comparison}
                      </Text>
                      <Badge
                        size="md"
                        radius="md"
                        style={{
                          backgroundColor: plan.isDark ? '#1864ab' : (plan.name === 'Pro' ? '#1864ab' : '#28347a'),
                          color: 'white',
                          fontWeight: 600,
                          textTransform: 'none',
                        }}
                      >
                        {plan.comparisonPrice}
                      </Badge>
                    </Group>
                  )}

                  {/* Features */}
                  <Box style={{ flex: 1 }} mb="xl">
                    <List
                      spacing="sm"
                      size="sm"
                      icon={
                        <ThemeIcon color="blue" size={20} radius="xl">
                          <IconCheck size={12} />
                        </ThemeIcon>
                      }
                    >
                      <List.Item>
                        <Text
                          size="sm"
                          c={plan.isDark ? 'white' : '#495057'}
                          fw={500}
                        >
                          {plan.validity}
                        </Text>
                      </List.Item>
                      {plan.features.map((feature, idx) => (
                        <List.Item key={idx}>
                          <Text
                            size="sm"
                            c={plan.isDark ? 'white' : '#495057'}
                            fw={500}
                          >
                            {feature}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  </Box>

                  {/* Buy Button */}
                  <Button
                    fullWidth
                    size="md"
                    radius="md"
                    style={{
                      backgroundColor: plan.isDark ? '#3d5a9e' : '#e9ecef',
                      color: plan.isDark ? 'white' : '#6c757d',
                      fontWeight: 600,
                      border: 'none',
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          {/* Terms & Conditions */}
          <Text size="sm" c="#495057" mt="xl">
            <Text component="span" fw={600}>
              Terms & Conditions :
            </Text>{' '}
            Exclusive GST & Payment Gateway Charges Applicable.
          </Text>
        </Container>
      </Box>

  )
}

export default Planandpricing