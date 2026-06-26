import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Text,
  Group,
  Button,
  List,
  ThemeIcon,
  Modal,
  Image,
  Flex,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import qrcode from "../../src/assets/qrcode.jpeg";
import { apiRequest } from "../utils/api";

/* ─── Exact Color Palette from Screenshot 2026-06-18 142438.png ─── */
const tiers = {
  bronze: {
    label: "Bronze",
    cardBg: "#e3edfa", // Soft ice blue tint (Basic/Starter)
    borderColor: "#c1daf8",
    textColor: "#1d3557",
    subTextColor: "#5c6f84",
    btnBg: "#0b6bcb",
    btnColor: "#fff",
    accent: "#0b6bcb",
  },
  silver: {
    label: "Silver",
    cardBg: "#e3edfa", // Soft ice blue tint
    borderColor: "#c1daf8",
    textColor: "#1d3557",
    subTextColor: "#5c6f84",
    btnBg: "#0b6bcb",
    btnColor: "#fff",
    accent: "#0b6bcb",
  },
  gold: {
    label: "Gold",
    cardBg: "#004b87", // Deep Navy/Dark Blue (Pro card)
    borderColor: "#003a66",
    textColor: "#ffffff",
    subTextColor: "rgba(255, 255, 255, 0.7)",
    btnBg: "#ffffff",
    btnColor: "#004b87",
    accent: "#ffd700",
    isBestValue: true, // Draws the "New" badge style
  },
  platinum: {
    label: "Platinum",
    cardBg: "#379ae6", // Bright Blue (Premium card)
    borderColor: "#228be6",
    textColor: "#ffffff",
    subTextColor: "rgba(255, 255, 255, 0.8)",
    btnBg: "#ffffff",
    btnColor: "#379ae6",
    accent: "#ffffff",
  },
  diamond: {
    label: "Diamond",
    cardBg: "#379ae6", // Bright Blue
    borderColor: "#228be6",
    textColor: "#ffffff",
    subTextColor: "rgba(255, 255, 255, 0.8)",
    btnBg: "#ffffff",
    btnColor: "#379ae6",
    accent: "#ffffff",
  },
};

const plans = [
  {
    tier: "bronze",
    name: "Starter",
    tokens: 7,
    originalPrice: 539,
    price: 490,
    discount: "10% OFF",
    features: ["7 Strategy Actions", "Create / Deploy / Backtest", "Basic Support"],
    buttonText: "Order Now",
  },
  {
    tier: "silver",
    name: "Trader Pack",
    tokens: 20,
    originalPrice: 1540,
    price: 1400,
    discount: "10% OFF",
    features: ["20 Strategy Actions", "Create / Deploy / Backtest", "Priority Support"],
    buttonText: "Order Now",
  },
  {
    tier: "silver",
    name: "Trader Pack",
    tokens: 30,
    originalPrice: 2210,
    price: 2100,
    discount: "10% OFF",
    features: ["30 Strategy Actions", "Create / Deploy / Backtest", "Priority Support"],
    buttonText: "Order Now",
  },
  {
    tier: "gold",
    name: "Pro",
    tokens: 50,
    originalPrice: 3850,
    price: 3500,
    discount: "10% OFF",
    features: [
      "50 Strategy Actions",
      "All Features Access",
      "Priority Support",
      "Faster Execution",
    ],
    buttonText: "Order Now",
    isBestValue: true,
    },
    {
  tier: "platinum",
  name: "Advanced",
  tokens: 100,
    originalPrice: 7700,
    price: 7000,
    discount: "10% OFF",
    features: ["100 Strategy Actions", "All Features Access", "Priority Support"],
    buttonText: "Order Now",
    },
   /* {
      tier: "diamond",
    name: "Enterprise",
    tokens: 500,
    originalPrice: 38500,
    price: 35000,
    discount: "10% OFF",
    features: ["500 Strategy Actions", "All Features Access", "Dedicated Support"],
    buttonText: "Order Now",
  }, */
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .pricing-root {
    font-family: 'Outfit', sans-serif;
    background: #ffffff;
    min-height: 100vh;
    position: relative;
    padding-bottom: 60px;
  }

  /* Exact Geometry Framework Match */
  .screenshot-card {
    border-radius: 32px;
    padding: 24px 20px 0px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid transparent;
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  .screenshot-card:hover {
    transform: translateY(-4px);
  }

  /* Distinct Top Card Floating Wrapper (White Box Layout) */
  .screenshot-card-header {
    background: #ffffff;
    border-radius: 24px;
    padding: 24px 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  .new-tag {
    position: absolute;
    top: 14px;
    right: 0;
    background: #ffd700;
    color: #000;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 14px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .included-title {
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    margin: 24px 0 18px 0;
    letter-spacing: 0.3px;
  }

  .features-container {
    flex: 1;
    padding-bottom: 24px;
    padding-left: 8px;
  }

  .action-container {
    display: flex;
    justify-content: center;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  /* Ice Blue tint bottom divider support */
  .light-divider {
    border-bottom-color: rgba(0, 0, 0, 0.08) !important;
  }

  .screenshot-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 11px 32px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transition: transform 0.1s ease, opacity 0.2s ease;
  }
  .screenshot-btn:hover {
    opacity: 0.95;
    transform: scale(1.02);
  }

  .screenshot-card-footer {
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }
  .screenshot-card-footer:hover {
    opacity: 0.8;
  }

  .coupon-btn {
    background: #ffffff;
    border: 1px solid #dbe2ef;
    color: #3f51b5;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  }
`;

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
      await apiRequest("POST", "/api/coupons/apply", { code: coupon });
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
        <Box style={{ position: "relative", zIndex: 1, padding: "24px 0 40px" }}>
          
          {/* Apply Coupon Row */}
          <Flex justify="flex-end" align="center" px="xl" mb="md">
            <button className="coupon-btn" onClick={() => setCouponOpen(true)}>
              + APPLY COUPON
            </button>
          </Flex>

          {/* Heading */}
          <Box ta="center" mb={6}>
            <Text style={{ fontSize: "2.4rem", fontWeight: 800, color: "#1d3557" }}>
              Plans & Pricing
            </Text>
          </Box>

          <Text ta="center" mb={40} style={{ color: "#5c6f84", fontSize: "13px", fontWeight: 500, letterSpacing: "0.5px" }}>
            1 TOKEN = 1 STRATEGY ACTION &nbsp;·&nbsp; CREATE / DEPLOY / BACKTEST / SIGNAL
          </Text>

          {/* Grid Layout Layout */}
          <Container size="xl" style={{ maxWidth: 1400 }}>
            <Grid justify="center" gutter="xl">
              {plans.map((plan) => {
                const t = tiers[plan.tier];
                const isCardLight = plan.tier === "bronze" || plan.tier === "silver";

                return (
                  <Grid.Col key={plan.name} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                    <div 
                      className="screenshot-card" 
                      style={{ 
                        background: t.cardBg,
                        borderColor: t.borderColor,
                      }}
                    >
                      {/* Top White Block Element */}
                      <div className="screenshot-card-header">
                        {plan.isBestValue && <div className="new-tag">New</div>}
                        
                        <Text style={{ fontSize: "20px", fontWeight: 700, color: "#1d3557" }} mb={2}>
                          {plan.name}
                        </Text>
                        
                        <Group align="baseline" gap={4}>
                          <Text style={{ fontSize: "24px", fontWeight: 800, color: "#1d3557" }}>
                            ₹{plan.price.toLocaleString()}
                          </Text>
                          <Text style={{ fontSize: "13px", color: "#5c6f84", fontWeight: 500 }}>
                            / {plan.tokens} Tokens
                          </Text>
                        </Group>

                        <Group gap={8} mt={6}>
                          <Text style={{ textDecoration: "line-through", color: "#a0aab5", fontSize: "12px" }}>
                            ₹{plan.originalPrice.toLocaleString()}
                          </Text>
                          <Text style={{ color: "#0b6bcb", fontSize: "12px", fontWeight: 700 }}>
                            ({plan.discount})
                          </Text>
                          <Text style={{ color: "#a0aab5", fontSize: "11px", marginLeft: "auto", fontWeight: 500 }}>
                            Excluding GST
                          </Text>
                        </Group>
                      </div>

                      {/* Header Title Text Section */}
                      <div className="included-title" style={{ color: t.textColor }}>
                        What's included
                      </div>

                      {/* Checkbox Listing Segment */}
                      <div className="features-container">
                        <List
                          spacing={12}
                          icon={
                            <ThemeIcon size={18} radius="xl" style={{ background: isCardLight ? "#0b6bcb" : "#ffffff", border: "none" }}>
                              <IconCheck size={12} stroke={3} style={{ color: isCardLight ? "#ffffff" : t.cardBg }} />
                            </ThemeIcon>
                          }
                        >
                          {plan.features.map((feat, i) => (
                            <List.Item key={i}>
                              <Text style={{ color: t.textColor, fontSize: "14px", fontWeight: 500 }}>
                                {feat}
                              </Text>
                            </List.Item>
                          ))}
                        </List>
                      </div>

                      {/* Unified Central Form Button */}
                      <div className={`action-container ${isCardLight ? "light-divider" : ""}`}>
                        <button 
                          className="screenshot-btn"
                          onClick={() => setQrOpened(true)}
                          style={{ background: t.btnBg, color: t.btnColor }}
                        >
                          <span>{plan.buttonText}</span>
                          <IconArrowRight size={16} stroke={2.5} />
                        </button>
                      </div>

                      {/* Bottom Media Call to Action row */}
                      {/* <div 
                        className="screenshot-card-footer" 
                        onClick={() => setQrOpened(true)}
                        style={{ color: isCardLight ? "#0b6bcb" : "#ffffff" }}
                      >
                        <IconPlayerPlay size={12} fill="currentColor" />
                        <Text style={{ fontSize: "13px", fontWeight: 700 }}>
                          Click Here to Watch Video
                        </Text>
                      </div> */}
                    </div>
                  </Grid.Col>
                );
              })}
            </Grid>

            {/* Base Disclaimer notes */}
            <Text ta="center" mt={45} style={{ color: "#5c6f84", fontSize: "13px", fontWeight: 500 }}>
              <span style={{ color: "#1d3557", fontWeight: 700 }}>Note:</span> Tokens are deducted per strategy action. GST & payment gateway charges may apply.
            </Text>
          </Container>
        </Box>

        {/* ── Payment QR Modal ── */}
        <Modal
          opened={qrOpened}
          onClose={() => { setQrOpened(false); setShowMessage(false); }}
          title="Complete Your Payment"
          centered
          styles={{
            content: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 20 },
            header: { background: "transparent", borderBottom: "1px solid #edf2f7" },
            title: { color: "#1d3557", fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
            close: { color: "#718096" },
          }}
        >
          <Text size="sm" mb="md" ta="center" c="#4a5568">
            Scan the QR code using GPay / UPI to complete your payment.
          </Text>

          <Box style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Image
              src={qrcode}
              alt="GPay QR"
              style={{
                width: 200,
                borderRadius: 12,
                border: "1px solid #cbd5e0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
          </Box>

          <Group justify="center">
            <Button
              onClick={() => setShowMessage(true)}
              style={{
                background: "#0b6bcb",
                color: "#ffffff",
                fontWeight: 700,
                borderRadius: 10,
              }}
            >
              I've Paid
            </Button>
          </Group>

          {showMessage && (
            <Text mt="md" ta="center" style={{ color: "#e65100", fontSize: 13, fontWeight: 600 }}>
              Contact admin — send screenshot on WhatsApp to confirm payment and receive tokens.
              <br />
              <br />
              <Text component="span" fw={700} c="#0b6bcb" style={{ fontSize: "15px" }}>
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
            content: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 20 },
            header: { background: "transparent", borderBottom: "1px solid #edf2f7" },
            title: { color: "#1d3557", fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
            close: { color: "#718096" },
          }}
        >
          <Stack>
            <TextInput
              label="Coupon Code"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              styles={{
                label: { color: "#4a5568", fontWeight: 600 },
                input: {
                  background: "#f7fafc",
                  border: "1px solid #cbd5e0",
                  color: "#1d3557",
                  borderRadius: 10,
                },
              }}
            />
            <Button
              loading={applying}
              onClick={handleApplyCoupon}
              style={{
                background: "#0b6bcb",
                color: "#ffffff",
                fontWeight: 700,
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