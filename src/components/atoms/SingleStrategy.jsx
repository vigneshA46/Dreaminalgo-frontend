import React from 'react'
import { MantineProvider, Box, Text, Group, Badge, Button, Anchor } from '@mantine/core';


const SingleStrategy = () => {
  return (
    <Box
        style={{
          backgroundColor: 'white',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '100%',
        }}
      >
        {/* Header */}
        <Box mb="md">
          <Text size="xl" fw={700} c="#212529" mb={8}>
            CPR BUY/SELL
          </Text>
          <Group gap={6} mb={8}>
            <Text size="sm" c="#868e96">
              Created 333 days ago by
            </Text>
            <Anchor 
              href="#" 
              size="sm" 
              fw={500}
              style={{ color: '#1864ab', textDecoration: 'none' }}
            >
              TRADEARTH
            </Anchor>
          </Group>
          <Anchor
            href="#"
            size="sm"
            fw={500}
            style={{ color: '#1864ab', textDecoration: 'none' }}
          >
            Read More...
          </Anchor>
        </Box>

        {/* Badges */}
        <Group gap="sm" mb="xl" mt="xl">
          <Badge
            size="lg"
            radius="md"
            variant="light"
            style={{
              backgroundColor: '#e7f5ff',
              color: '#1864ab',
              fontWeight: 500,
              padding: '8px 16px',
              textTransform: 'none',
              fontSize: '14px',
            }}
          >
            Intraday
          </Badge>
          <Badge
            size="lg"
            radius="md"
            variant="light"
            style={{
              backgroundColor: '#e7f5ff',
              color: '#1864ab',
              fontWeight: 500,
              padding: '8px 16px',
              textTransform: 'none',
              fontSize: '14px',
            }}
          >
            Bullish
          </Badge>
          <Badge
            size="lg"
            radius="md"
            variant="light"
            style={{
              backgroundColor: '#e7f5ff',
              color: '#1864ab',
              fontWeight: 500,
              padding: '8px 16px',
              textTransform: 'none',
              fontSize: '14px',
            }}
          >
            Bearish
          </Badge>
        </Group>

        {/* Deploy Button */}
        <Button
          size="md"
          style={{
            backgroundColor: '#1864ab',
            borderRadius: '6px',
            fontWeight: 500,
            paddingLeft: '28px',
            paddingRight: '28px',
            fontSize: '15px',
          }}
        >
          Deploy
        </Button>
      </Box>
  )
}

export default SingleStrategy