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
import { IconCheck } from "@tabler/icons-react";
import qrcode from "../../src/assets/qrcode.jpeg"
import { apiRequest } from "../utils/api";

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

    const res = await apiRequest("POST", "/api/coupons/apply", {
      code: coupon,
    });

    console.log(res);

    // optional: refresh user tokens here

    setCoupon("");
    setCouponOpen(false);

  } catch (err) {
    console.log(err);
  } finally {
    setApplying(false);
  }
};

  const plans = [
  {
    name: "Starter",
    tokens: 7,
    originalPrice: 665,
    price: 659,
    discount: "1% OFF",
    features: [
      "7 Strategy Actions",
      "Create / Deploy / Backtest",
      "Basic Support",
    ],
    isDark: false,
    buttonText:"Buy Now"
  },
  {
    name: "Trader Pack",
    tokens: 30,
    originalPrice: 2850,
    price: 2749,
    discount: "3.5% OFF",
    features: [
      "30 Strategy Actions",
      "Create / Deploy / Backtest",
      "Priority Support",
    ],
    isDark: false,
    buttonText:"Buy Now"
  },
  {
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
    isDark: true,
    buttonText:"Buy Now"
  },
  {
    name: "Advanced",
    tokens: 100,
    originalPrice: 9500,
    price: 8499,
    discount: "10.5% OFF",
    features: [
      "100 Strategy Actions",
      "All Features Access",
      "Priority Support",
    ],
    isDark: false,
    buttonText:"Buy Now"
  },
  {
    name: "Enterprise",
    tokens: 500,
    originalPrice: 47500,
    price: 39999,
    discount: "15.8% OFF",
    features: [
      "500 Strategy Actions",
      "All Features Access",
      "Dedicated Support",
    ],
    isDark: false,
    buttonText:"Buy Now"
  },
];

  return (
    <Box style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 0" }}>

      <Flex align={"center"} justify={"flex-end"} >
        <Button bg={"#000"} onClick={() => setCouponOpen(true)}>+ APPLY COUPON</Button>
      </Flex>
      {/* Heading */}
      <Text size="1.8rem" fw={700} ta="center" mb="xs">
        Plans and Pricing
      </Text>
      



      <Text size="sm" ta="center" c="#868e96" mb="xl">
        1 Token = 1 Strategy Action (Create / Deploy / Backtest / Signal)
      </Text>

      <Container size="xl" style={{ maxWidth: "1400px" }}>
        <Grid justify="center" gutter="lg">
          {plans.map((plan, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <Card
                radius="md"
                style={{
                  position: "relative",
                  backgroundColor: plan.isDark ? "#1e2952" : "white",
                  border: plan.isDark ? "none" : "1px solid #e9ecef",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* BEST VALUE Badge */}
                {plan.isDark && (
                  <Badge
                    color="blue"
                    variant="filled"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  >
                    BEST VALUE
                  </Badge>
                )}

                {/* Plan Name */}
                <Text
                  size="xl"
                  fw={600}
                  ta="center"
                  mb="lg"
                  c={plan.isDark ? "white" : "#212529"}
                >
                  {plan.name}
                </Text>

                {/* Tokens */}
                <Group justify="center" mb="xs">
                  <Text size="xl" fw={700} c={plan.isDark ? "white" : "#212529"}>
                    {plan.tokens} Tokens
                  </Text>
                </Group>

                {/* Price */}
                <Group justify="center" gap={6}>
  <Text
    size="sm"
    td="line-through"
    c={plan.isDark ? "#b8c4d9" : "#adb5bd"}
  >
    ₹{plan.originalPrice}
  </Text>

  <Badge color="green" variant="light">
    {plan.discount}
  </Badge>
</Group>

<Text
  size="lg"
  fw={700}
  ta="center"
  c={plan.isDark ? "white" : "#212529"}
>
  ₹{plan.price}
</Text>
                {/* Price per token */}
                <Text
                  size="xs"
                  ta="center"
                  c={plan.isDark ? "#b8c4d9" : "#868e96"}
                  mb="lg"
                >
                  ₹{(plan.price / plan.tokens).toFixed(1)} / token
                </Text>

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
                    {plan.features.map((feature, idx) => (
                      <List.Item key={idx}>
                        <Text
                          size="sm"
                          c={plan.isDark ? "white" : "#495057"}
                          fw={500}
                        >
                          {feature}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                </Box>

                {/* Button */}
                <Button
                fullWidth
                size="md"
                radius="md"
              style={{
                backgroundColor: plan.isDark ? "#3d5a9e" : "#e9ecef",
                color: plan.isDark ? "white" : "#6c757d",
                fontWeight: 600,
                border: "none",
                }}
                onClick={() => setQrOpened(true)}
                >
                {plan.buttonText}
              </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Footer */}
        <Text size="sm" c="#495057" mt="xl" ta="center">
          <Text component="span" fw={600}>
            Note:
          </Text>{" "}
          Tokens are deducted per strategy action. GST & payment gateway charges may apply.
        </Text>
      </Container>

      <Modal
  opened={qrOpened}
  onClose={() => setQrOpened(false)}
  title="Complete Your Payment"
  centered
>
  <Text size="sm" mb="md" ta="center">
    Scan the QR code using GPay / UPI to complete your payment.
  </Text>

  <Box style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <Image
      src={qrcode}
      alt="GPay QR"
      style={{ width: "200px", borderRadius: "8px" }}
    />
  </Box>

  <Group justify="center">
    <Button
  onClick={() => setShowMessage(true)}
>
  Pay
</Button>

{showMessage && (
  <Text mt="md" c="red" ta="center">
    Contact admin Send screenshot in Whatsapp to confirm payment and get tokens.<br/><br/> Phone: +91 9787675597 /  +91 9080058704
  </Text>
)}
  </Group>
</Modal>
<Modal
  opened={couponOpen}
  onClose={() => setCouponOpen(false)}
  title="Apply Coupon"
  centered
>
  <Stack>
    <TextInput
      label="Coupon Code"
      placeholder="Enter coupon code"
      value={coupon}
      onChange={(e) => setCoupon(e.target.value)}
    />

    <Button loading={applying} bg={"#000"} onClick={handleApplyCoupon}>
      Apply Coupon
    </Button>
  </Stack>
</Modal>
    </Box>
  );
};

export default Planandpricing;