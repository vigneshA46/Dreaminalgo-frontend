import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  ThemeIcon,
  Stack,
  List,
} from "@mantine/core";
import {
  IconChartLine,
  IconShieldLock,
  IconCpu,
  IconBook,
  IconRocket,
} from "@tabler/icons-react";

export default function About() {
  return (
    <>
      {/* SEO Optimization for Vite (React Helmet) */}
      <Helmet>
        <title >Algo Trading Platform | About Us</title>
        <meta
          name="description"
          content="Advanced web-based algorithmic trading platform for NSE, BSE, and MCX. Automate strategies, connect brokers, and trade smarter with real-time analytics and secure systems."
        />
        <meta
          name="keywords"
          content="algo trading India, automated trading platform, NSE trading bot, BSE trading system, MCX algo trading, trading strategies platform"
        />
      </Helmet>

      <Container size="lg" py="xl">
        {/* Hero Section */}
        <Stack align="center" mb="xl">
          <Title fw={'500'} order={1} ta="center">
            Empowering Smarter Trading Through Automation
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={700}>
            A next-generation algorithmic trading platform designed for Indian traders to automate strategies, analyze performance, and trade securely.
          </Text>
        </Stack>

        {/* What We Do */}
        <Grid justify={"space-between"} mb="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card  withBorder radius={'1rem'} >
            <Title fw={'500'} order={2}>What We Do</Title>
            <Text style={{textAlign:'justify'}} mt="md">
              We simplify algorithmic trading by enabling users to deploy strategies,
              monitor trades in real-time, and learn trading concepts — all without coding.
            </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card  withBorder radius={'1rem'}>
            <Title fw={'500'} order={2}>Our Mission</Title>
            <Text style={{textAlign:'justify'}} mt="md">
              To make algorithmic trading accessible to everyone by combining
              automation, transparency, and education with secure technology and Event driven systems
            </Text>
          </Card>
          </Grid.Col>
        </Grid>

        {/* Features */}
        <Title fw={'500'} order={2} ta="center" mb="lg">
          Key Features
        </Title>

        <Grid>
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ThemeIcon bg={"#000"} size="lg" radius="xl" mb="sm">
                  <feature.icon size={20} />
                </ThemeIcon>
                <Title fw={'500'} order={4}>{feature.title}</Title>
                <Text size="sm" c="dimmed" mt="sm">
                  {feature.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Security Section */}
        <Grid w={"100%"} justify={"space-between"} mt="xl" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2}>Security First</Title>
            <Text mt="md">
              We prioritize your safety with encrypted systems, secure APIs, and
              token-based authentication to ensure your trading data remains protected.
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }} style={{ textAlign: "center" }}>
            <ThemeIcon bg={"#000"} size={80} radius="xl">
              <IconShieldLock size={40} />
            </ThemeIcon>
          </Grid.Col>
        </Grid>

        {/* Markets */}
       {/*  <Stack mt="xl" align="center">
          <Title fw={'500'} order={2}>Supported Markets & Brokers</Title>
          <Text ta="center" c="dimmed" maw={600}>
            Trade across NSE, BSE, and MCX with seamless integrations to leading brokers.
          </Text>
        </Stack> */}

        {/* Future */}
        <Grid mt="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title fw={'500'} order={2}>Future Ready</Title>
            <Text mt="md">
              Our platform is evolving with AI-driven strategy optimization,
              predictive analytics, and advanced backtesting tools.
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }} style={{ textAlign: "center" }}>
            <ThemeIcon bg={"#000"} size={80} radius="xl">
              <IconCpu size={40} />
            </ThemeIcon>
          </Grid.Col>
        </Grid>

        {/* CTA */}
        <Stack align="center" mt="10rem">
          <Title fw={'500'} order={2}>Join the Future of Trading</Title>
          <Text ta="center" maw={600} c="dimmed">
            Automate your strategies, reduce emotional decisions, and trade smarter with our platform.
          </Text>
        </Stack>
      </Container>
    </>
  );
}

const features = [
  {
    icon: IconChartLine,
    title: "Strategy Marketplace",
    description: "Explore and subscribe to proven trading strategies tailored for market conditions.",
  },
  {
    icon: IconRocket,
    title: "Paper & Live Trading",
    description: "Test risk-free or deploy strategies live with broker integrations.",
  },
  {
    icon: IconChartLine,
    title: "Real-Time Analytics",
    description: "Monitor trades and performance with powerful dashboards.",
  },
  {
    icon: IconCpu,
    title: "Custom Strategy Builder",
    description: "Create strategies using a simple form — no coding required.",
  },
  {
    icon: IconShieldLock,
    title: "Secure Integrations",
    description: "Connect brokers securely with encrypted APIs and Trade automatically",
  },
  {
    icon: IconBook,
    title: "Learning Hub",
    description: "Access tutorials, guides, and educational trading content.",
  },
];
