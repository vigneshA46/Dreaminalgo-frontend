import { Box, Title, Text, Divider, Button, Group, Card, Container, TextInput, ActionIcon, Flex, Table, Badge, Image } from "@mantine/core";
import { IconArrowNarrowRight, IconCurrencyRupee, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import aliceblue from "../assets/aliceblue.avif";
import dhan from "../assets/dhan.jpeg";
import zebu from "../assets/zebu.png"
import angelone from "../assets/angelone.webp"
import zerodha from "../assets/zerodha.png"

export default function Demataccount() {

    const [amount, setAmount] = useState('0');

  const transactions = [
    {
      sno: '1097593',
      transaction: 'New Deployment fee deducted',
      date: '01 Dec, 2025',
      reference: 'Debit',
      credit: '',
      debit: '60.00',
      balance: '380.00',
    },
    {
      sno: '1095981',
      transaction: 'New Deployment fee deducted',
      date: '28 Nov, 2025',
      reference: 'Debit',
      credit: '',
      debit: '60.00',
      balance: '440.00',
    },
    {
      sno: '1094385',
      transaction: 'New Deployment fee deducted',
      date: '27 Nov, 2025',
      reference: 'Debit',
      credit: '',
      debit: '60.00',
      balance: '500.00',
    },
    {
      sno: '1093129',
      transaction: 'New Deployment fee deducted',
      date: '26 Nov, 2025',
      reference: 'Debit',
      credit: '',
      debit: '60.00',
      balance: '560.00',
    },
    {
      sno: '1091681',
      transaction: 'New Deployment fee deducted',
      date: '25 Nov, 2025',
      reference: 'Debit',
      credit: '',
      debit: '60.00',
      balance: '620.00',
    },
    {
      sno: '1090385',
      transaction: 'New Deployment fee deducted',
      date: '24 Nov, 2025',
      reference: 'Debit',
      credit: '',
      debit: '60.00',
      balance: '680.00',
    },
  ];

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };


    const [formData, setFormData] = useState({
    firstName: 'vignesh',
    lastName: 'Arumugam',
    email: 'vignesh2024a@gmail.com',
    phoneNumber: '919994370646',
    registerDate: '2025-11-26',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <Box
    w={"100%"}
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: 10,
        
        margin: "0",
      }}
    >

     
      {/* ================= DEMAT ACCOUNT SECTION ================= */}
      <Title order={3} mb={8}>Demat Account</Title>
      <Card  withBorder radius="md" p="lg" mb={32}>
        
              <Flex align={"center"} justify={"space-between"} >
                <Card
  px="2rem"
  withBorder
  style={{ alignItems: "center", cursor: "pointer" }}
  onClick={() => window.open("https://login.dhan.co/", "_blank")}
>
  <Image src={dhan} w="5rem" />
  <Text size="0.8rem">Dhan</Text>
</Card>

                 <Card onClick={() => window.open("https://oa.zebuetrade.com/", "_blank")} px={"2rem"} withBorder style={{alignItems:'center',cursor:'pointer'}} >
                <Image src={zebu} w={"5rem"}  />
                <Text size="0.8rem" >zebu</Text></Card>

                 <Card onClick={() => window.open("https://www.angelone.in/signup/register", "_blank")} px={"2rem"} withBorder style={{alignItems:'center',cursor:'pointer'}} >
                <Image src={angelone} w={"5rem"}  />
                <Text size="0.8rem" >angelone</Text></Card>

                 <Card onClick={() => window.open("https://aliceblueonline.com/open-demat-account", "_blank")} px={"2rem"} withBorder style={{alignItems:'center',cursor:'pointer'}} >
                <Image src={aliceblue} w={"5rem"}  />
                <Text size="0.8rem" >aliceblue</Text></Card>

                 <Card onClick={() => window.open("https://signup.zerodha.com/", "_blank")} px={"2rem"} withBorder style={{alignItems:'center',cursor:'pointer'}} >
                <Image src={zerodha} w={"5rem"}  />
                <Text size="0.8rem" >zerodha</Text></Card>

              </Flex>
              <Text size="sm" my="md">Open a free Demat account with our supported partners</Text>
      </Card>

      <Divider mb={32} />

    </Box>
  );
}
