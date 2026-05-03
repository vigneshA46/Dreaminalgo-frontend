import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Button,
  List,
  ThemeIcon,
  Modal,
  Image,
  Flex,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconSparkles } from "@tabler/icons-react";
import qrcode from "../../src/assets/qrcode.jpeg";
import { apiRequest } from "../utils/api";

/* ─── Tier palette ─────────────────────────────────────────────────── */
const tiers = {
  bronze: {
    label: "Bronze",
    aura: "rgba(205,127,50,0.35)",
    glow: "#cd7f32",
    border: "rgba(205,127,50,0.6)",
    gradient: "linear-gradient(135deg,#3b2a1a 0%,#1c130a 100%)",
    accent: "#e8975a",
    shimmer: "rgba(205,127,50,0.15)",
    badgeBg: "rgba(205,127,50,0.2)",
    badgeColor: "#e8975a",
    iconBg: "rgba(205,127,50,0.2)",
    iconColor: "#cd7f32",
  },
  silver: {
    label: "Silver",
    aura: "rgba(192,192,192,0.3)",
    glow: "#c0c0c0",
    border: "rgba(192,192,192,0.55)",
    gradient: "linear-gradient(135deg,#1e2530 0%,#10141a 100%)",
    accent: "#d8e4f0",
    shimmer: "rgba(192,192,192,0.12)",
    badgeBg: "rgba(180,190,205,0.2)",
    badgeColor: "#c8d8e8",
    iconBg: "rgba(192,192,192,0.15)",
    iconColor: "#a0b0c0",
  },
  gold: {
    label: "Gold",
    aura: "rgba(255,215,0,0.4)",
    glow: "#ffd700",
    border: "rgba(255,215,0,0.65)",
    gradient: "linear-gradient(135deg,#2a2000 0%,#141000 100%)",
    accent: "#ffe566",
    shimmer: "rgba(255,215,0,0.18)",
    badgeBg: "rgba(255,215,0,0.25)",
    badgeColor: "#ffe566",
    iconBg: "rgba(255,215,0,0.2)",
    iconColor: "#ffd700",
    isBestValue: true,
  },
  platinum: {
    label: "Platinum",
    aura: "rgba(180,210,240,0.35)",
    glow: "#b4d2ef",
    border: "rgba(180,210,240,0.55)",
    gradient: "linear-gradient(135deg,#0d1520 0%,#060d15 100%)",
    accent: "#cce0f5",
    shimmer: "rgba(180,210,240,0.12)",
    badgeBg: "rgba(180,210,240,0.2)",
    badgeColor: "#b4d2ef",
    iconBg: "rgba(180,210,240,0.15)",
    iconColor: "#8ab4d8",
  },
  diamond: {
    label: "Diamond",
    aura: "rgba(120,220,255,0.4)",
    glow: "#78dcff",
    border: "rgba(120,220,255,0.65)",
    gradient: "linear-gradient(135deg,#050f1a 0%,#020810 100%)",
    accent: "#a8edff",
    shimmer: "rgba(120,220,255,0.18)",
    badgeBg: "rgba(120,220,255,0.25)",
    badgeColor: "#78dcff",
    iconBg: "rgba(120,220,255,0.2)",
    iconColor: "#50c8f0",
  },
};

const plans = [
  {
    tier: "bronze",
    name: "Starter",
    tokens: 7,
    originalPrice: 665,
    price: 659,
    discount: "1% OFF",
    features: ["7 Strategy Actions", "Create / Deploy / Backtest", "Basic Support"],
    buttonText: "Buy Now",
  },
  {
    tier: "silver",
    name: "Trader Pack",
    tokens: 30,
    originalPrice: 2850,
    price: 2749,
    discount: "3.5% OFF",
    features: ["30 Strategy Actions", "Create / Deploy / Backtest", "Priority Support"],
    buttonText: "Buy Now",
  },
  {
    tier: "gold",
    name: "Pro",
    tokens: 50,
    originalPrice: 4750,
    price: 4399,
    discount: "7.4% OFF",
    features: [
      "50 Strategy Actions",
      "All Features Access",
      "Priority Support",
      "Faster Execution",
    ],
    buttonText: "Buy Now",
    isBestValue: true,
  },
  {
    tier: "platinum",
    name: "Advanced",
    tokens: 100,
    originalPrice: 9500,
    price: 8499,
    discount: "10.5% OFF",
    features: ["100 Strategy Actions", "All Features Access", "Priority Support"],
    buttonText: "Buy Now",
  },
  {
    tier: "diamond",
    name: "Enterprise",
    tokens: 500,
    originalPrice: 47500,
    price: 39999,
    discount: "15.8% OFF",
    features: ["500 Strategy Actions", "All Features Access", "Dedicated Support"],
    buttonText: "Buy Now",
  },
];

/* ─── Keyframe styles injected once ───────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .pricing-root {
    font-family: 'Outfit', sans-serif;
    background: #050810;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .pricing-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 20% 10%, rgba(100,60,20,0.15) 0%, transparent 70%),
      radial-gradient(ellipse 50% 50% at 80% 90%, rgba(30,60,120,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 50% 50%, rgba(20,10,40,0.3) 0%, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }

  /* star field */
  .stars {
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 42% 65%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.35) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 85% 55%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 15%, rgba(255,255,255,0.35) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 5% 50%, rgba(255,255,255,0.4) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes floatUp {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  @keyframes rotateBorder {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .plan-card-wrap {
    animation: floatUp 4s ease-in-out infinite;
  }
  .plan-card-wrap:nth-child(2) { animation-delay: 0.5s; }
  .plan-card-wrap:nth-child(3) { animation-delay: 1s; }
  .plan-card-wrap:nth-child(4) { animation-delay: 1.5s; }
  .plan-card-wrap:nth-child(5) { animation-delay: 2s; }

  .plan-card {
    position: relative;
    border-radius: 20px;
    padding: 2px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
  }
  .plan-card:hover { transform: translateY(-6px) scale(1.015); }

  .plan-card-inner {
    border-radius: 18px;
    padding: 28px 22px 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .plan-card-inner::before {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 180px; height: 180px;
    border-radius: 50%;
    opacity: 0.18;
    filter: blur(40px);
    pointer-events: none;
  }

  .tier-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 12px;
  }

  .tier-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px;
    font-size: 22px;
  }

  .price-shimmer {
    background: linear-gradient(90deg, currentColor 25%, rgba(255,255,255,0.9) 50%, currentColor 75%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .buy-btn {
    position: relative;
    overflow: hidden;
    border: none;
    border-radius: 12px;
    padding: 13px 0;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    width: 100%;
    transition: filter 0.2s, transform 0.15s;
  }
  .buy-btn:hover { filter: brightness(1.15); transform: scale(1.02); }
  .buy-btn:active { transform: scale(0.98); }

  .buy-btn::after {
    content: '';
    position: absolute;
    top: -50%; left: -60%;
    width: 30%; height: 200%;
    background: rgba(255,255,255,0.2);
    transform: skewX(-20deg);
    transition: left 0.4s ease;
  }
  .buy-btn:hover::after { left: 130%; }

  .best-value-ribbon {
    position: absolute;
    top: 14px; right: -28px;
    background: linear-gradient(90deg, #ffd700, #ffaa00);
    color: #1a0f00;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.5px;
    padding: 5px 36px;
    transform: rotate(35deg);
    text-transform: uppercase;
    box-shadow: 0 2px 12px rgba(255,200,0,0.5);
    z-index: 5;
  }

  .divider-line {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 18px 0;
  }

  .coupon-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.85);
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    border-radius: 10px;
    padding: 9px 20px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .coupon-btn:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.3);
  }

  .modal-overlay .mantine-Modal-content {
    background: #0d111e;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
  }
  .modal-overlay .mantine-Modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .modal-overlay .mantine-Modal-title {
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
  }
  .modal-overlay .mantine-Modal-close {
    color: rgba(255,255,255,0.5);
  }
`;

/* ─── Tier icons (emoji-based) ─────────────────────────────────────── */
const tierIcons = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🏆",
  platinum: "💠",
  diamond: "💎",
};

/* ─── Main component ───────────────────────────────────────────────── */
const Planandpricing = () => {
  const [qrOpened, setQrOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async () => {
    if (!coupon) return;
    try {
      setApplying(true);
      const res = await apiRequest("POST", "/api/coupons/apply", { code: coupon });
      console.log(res);
      setCoupon("");
      setCouponOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      <Box className="pricing-root">
        <div className="stars" />

        <Box style={{ position: "relative", zIndex: 1, padding: "36px 0 60px" }}>
          {/* ── Header actions ── */}
          <Flex justify="flex-end" align="center" px="xl" mb="xl">
            <button className="coupon-btn" onClick={() => setCouponOpen(true)}>
              + APPLY COUPON
            </button>
          </Flex>

          {/* ── Title ── */}
          <Box ta="center" mb={8}>
            <Text
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "2.6rem",
                fontWeight: 800,
                background: "linear-gradient(90deg,#cd7f32,#c0c0c0,#ffd700,#b4d2ef,#78dcff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
                letterSpacing: "-0.5px",
              }}
            >
              Plans & Pricing
            </Text>
          </Box>

          <Text
            ta="center"
            mb={48}
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              letterSpacing: "1px",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            1 TOKEN = 1 STRATEGY ACTION &nbsp;·&nbsp; CREATE / DEPLOY / BACKTEST / SIGNAL
          </Text>

          {/* ── Cards ── */}
          <Container size="xl" style={{ maxWidth: 1380 }}>
            <Grid justify="center" gutter="lg">
              {plans.map((plan) => {
                const t = tiers[plan.tier];
                return (
                  <Grid.Col key={plan.name} span={{ base: 6, sm: 6, md: 4, lg: 12 / 5 }}>
                    <div className="plan-card-wrap" style={{ height: "100%" }}>
                      {/* outer glow border */}
                      <div
                        className="plan-card"
                        style={{
                          background: t.border,
                          boxShadow: `0 0 30px ${t.aura}, 0 0 60px ${t.aura.replace("0.35", "0.15")}`,
                        }}
                      >
                        {/* Best value ribbon */}
                        {plan.isBestValue && (
                          <div className="best-value-ribbon">Best Value</div>
                        )}

                        <div
                          className="plan-card-inner"
                          style={{
                            background: t.gradient,
                            border: `1px solid ${t.border}`,
                          }}
                        >
                          {/* corner aura */}
                          <div
                            className="plan-card-inner::before"
                            style={{
                              position: "absolute",
                              top: -60, left: -60,
                              width: 180, height: 180,
                              borderRadius: "50%",
                              background: t.glow,
                              opacity: 0.2,
                              filter: "blur(45px)",
                              pointerEvents: "none",
                            }}
                          />

                          {/* tier badge */}
                          <Box ta="center">
                            <span
                              className="tier-badge"
                              style={{
                                background: t.badgeBg,
                                color: t.badgeColor,
                                border: `1px solid ${t.border}`,
                              }}
                            >
                              {t.label}
                            </span>
                          </Box>

                          {/* icon */}
                          <Box ta="center" mb={6}>
                            <div
                              className="tier-icon"
                              style={{
                                background: t.iconBg,
                                border: `1px solid ${t.border}`,
                                boxShadow: `0 0 20px ${t.aura}`,
                              }}
                            >
                              {tierIcons[plan.tier]}
                            </div>
                          </Box>

                          {/* plan name */}
                          <Text
                            ta="center"
                            fw={700}
                            mb={16}
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "1.25rem",
                              color: t.accent,
                            }}
                          >
                            {plan.name}
                          </Text>

                          {/* tokens */}
                          <Text
                            ta="center"
                            mb={8}
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "2rem",
                              fontWeight: 800,
                              color: "#fff",
                              lineHeight: 1,
                            }}
                          >
                            {plan.tokens}
                            <Text component="span" style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(255,255,255,0.45)", marginLeft: 6 }}>
                              tokens
                            </Text>
                          </Text>

                          {/* price row */}
                          <Group justify="center" gap={8} mb={4}>
                            <Text
                              style={{
                                textDecoration: "line-through",
                                color: "rgba(255,255,255,0.3)",
                                fontSize: "13px",
                              }}
                            >
                              ₹{plan.originalPrice.toLocaleString()}
                            </Text>
                            <span
                              style={{
                                background: t.badgeBg,
                                color: t.badgeColor,
                                border: `1px solid ${t.border}`,
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "2px 8px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {plan.discount}
                            </span>
                          </Group>

                          <Text
                            ta="center"
                            mb={4}
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "1.8rem",
                              fontWeight: 800,
                              background: `linear-gradient(90deg, ${t.glow}, ${t.accent}, ${t.glow})`,
                              backgroundSize: "200% auto",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              animation: "shimmer 3s linear infinite",
                            }}
                          >
                            ₹{plan.price.toLocaleString()}
                          </Text>

                          <Text
                            ta="center"
                            mb={20}
                            style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}
                          >
                            ₹{(plan.price / plan.tokens).toFixed(1)} / token
                          </Text>

                          <hr className="divider-line" />

                          {/* features */}
                          <Box style={{ flex: 1 }} mb={24}>
                            <List
                              spacing={10}
                              size="sm"
                              icon={
                                <ThemeIcon
                                  radius="xl"
                                  size={20}
                                  style={{
                                    background: t.iconBg,
                                    border: `1px solid ${t.border}`,
                                  }}
                                >
                                  <IconCheck
                                    size={11}
                                    style={{ color: t.iconColor }}
                                  />
                                </ThemeIcon>
                              }
                            >
                              {plan.features.map((feat, i) => (
                                <List.Item key={i}>
                                  <Text
                                    style={{
                                      color: "rgba(255,255,255,0.75)",
                                      fontSize: "13px",
                                      fontFamily: "'Outfit', sans-serif",
                                    }}
                                  >
                                    {feat}
                                  </Text>
                                </List.Item>
                              ))}
                            </List>
                          </Box>

                          {/* CTA button */}
                          <button
                            className="buy-btn"
                            onClick={() => setQrOpened(true)}
                            style={{
                              background: `linear-gradient(135deg, ${t.glow}, ${t.iconColor})`,
                              color: plan.tier === "gold" || plan.tier === "bronze" ? "#1a0e00" : "#fff",
                              boxShadow: `0 4px 20px ${t.aura}`,
                            }}
                          >
                            {plan.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Grid.Col>
                );
              })}
            </Grid>

            {/* footer note */}
            <Text
              ta="center"
              mt={40}
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "12px",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.3px",
              }}
            >
              <Text component="span" fw={600} style={{ color: "rgba(255,255,255,0.5)" }}>
                Note:
              </Text>{" "}
              Tokens are deducted per strategy action. GST & payment gateway charges may apply.
            </Text>
          </Container>
        </Box>

        {/* ── Payment QR Modal ── */}
        <Modal
          opened={qrOpened}
          onClose={() => { setQrOpened(false); setShowMessage(false); }}
          title="Complete Your Payment"
          centered
          className="modal-overlay"
          styles={{
            content: {
              background: "#0d111e",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20,
            },
            header: {
              background: "transparent",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            },
            title: {
              color: "#fff",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
            },
            close: { color: "rgba(255,255,255,0.5)" },
          }}
        >
          <Text size="sm" mb="md" ta="center" c="rgba(255,255,255,0.6)">
            Scan the QR code using GPay / UPI to complete your payment.
          </Text>

          <Box style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Image
              src={qrcode}
              alt="GPay QR"
              style={{
                width: 200,
                borderRadius: 12,
                border: "1px solid rgba(255,215,0,0.3)",
                boxShadow: "0 0 30px rgba(255,215,0,0.15)",
              }}
            />
          </Box>

          <Group justify="center">
            <Button
              onClick={() => setShowMessage(true)}
              style={{
                background: "linear-gradient(135deg,#ffd700,#ffaa00)",
                color: "#1a0e00",
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                border: "none",
                borderRadius: 10,
              }}
            >
              I've Paid
            </Button>
          </Group>

          {showMessage && (
            <Text mt="md" ta="center" style={{ color: "#78dcff", fontSize: 13 }}>
              Contact admin — send screenshot on WhatsApp to confirm payment and receive tokens.
              <br />
              <br />
              <Text component="span" fw={700} c="#ffd700">
                +91 9787675597 &nbsp;/&nbsp; +91 9080058704
              </Text>
            </Text>
          )}
        </Modal>

        {/* ── Coupon Modal ── */}
        <Modal
          opened={couponOpen}
          onClose={() => setCouponOpen(false)}
          title="Apply Coupon"
          centered
          styles={{
            content: {
              background: "#0d111e",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20,
            },
            header: {
              background: "transparent",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            },
            title: {
              color: "#fff",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
            },
            close: { color: "rgba(255,255,255,0.5)" },
          }}
        >
          <Stack>
            <TextInput
              label="Coupon Code"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              styles={{
                label: { color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" },
                input: {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  borderRadius: 10,
                },
              }}
            />
            <Button
              loading={applying}
              onClick={handleApplyCoupon}
              style={{
                background: "linear-gradient(135deg,#78dcff,#2090c0)",
                color: "#050810",
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                border: "none",
                borderRadius: 10,
              }}
            >
              Apply Coupon
            </Button>
          </Stack>
        </Modal>
      </Box>
    </>
  );
};

export default Planandpricing;