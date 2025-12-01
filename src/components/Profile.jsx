import { Box, Title, Text, Divider, Button, Group, Card, Container, TextInput, ActionIcon, Flex, Table, Badge, Image } from "@mantine/core";
import { IconArrowNarrowRight, IconCurrencyRupee, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import aliceblue from "../assets/aliceblue.avif";
import dhan from "../assets/dhan.jpeg";
import zebu from "../assets/zebu.png"
import angelone from "../assets/angelone.webp"
import zerodha from "../assets/zerodha.png"

export default function Profile() {

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
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: 10,
        maxWidth: 950,
        margin: "0 auto",
      }}
    >

            {/* ================= WALLET SECTION ================= */}
      <Title order={3} mb={8}>Wallet</Title>
        <Container >
          {/* Top Section - Available Amount and Add Money */}
          <Flex gap="lg" mb="xl" align="center" style={{ flexWrap: 'wrap' }}>
            {/* Available Amount Card */}
            <Box
              style={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '12px',
                padding: '16px 24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                flex: '0 0 auto',
              }}
            >
              <Group gap="md" align="center">
                <Box
                  style={{
                    backgroundColor: '#000000ff',
                    borderRadius: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCurrencyRupee size={28} color="white" stroke={2.5} />
                </Box>
                <Box>
                  <Text size="sm" c="#868e96" fw={500} mb={4}>
                    Available Amount
                  </Text>
                  <Group gap={4} align="center">
                    <Text size="xl" fw={700} c="#212529">
                      ₹ 380
                    </Text>
                  </Group>
                </Box>
              </Group>
            </Box>

            {/* Add Money Section */}
            <Box
              style={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '12px',
                padding: '20px 24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                flex: '1 1 auto',
              }}
            >
              <Flex gap="md" align="center" justify={"center"} style={{ flexWrap: 'wrap' }}>
                <TextInput
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  styles={{
                    input: {
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '16px',
                      padding: '20px 24px',
                      height: '48px',
                      width: '180px',
                      color: '#495057',
                    },
                  }}
                />

                <Button
                  size="sm"
                  style={{
                    backgroundColor: '#000000ff',
                    borderRadius: '8px',
                    fontWeight: 600,
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    marginLeft: 'auto',
                  }}
                >
                  ADD MONEY
                </Button>
                <Button
                  size="sm"
                  style={{
                    backgroundColor: '#000000ff',
                    borderRadius: '8px',
                    fontWeight: 600,
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    marginLeft: 'auto',
                  }}
                >
                  VIEW DETAILS
                </Button>
              </Flex>
            </Box>
          </Flex>

          {/* Transaction Table */}
         {/*  <Box
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Table
              horizontalSpacing="md"
              verticalSpacing="md"
              style={{
                minWidth: '100%',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#f8f9fa' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Transaction
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Date
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Reference
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Credit
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Debit
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Balance
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {transactions.map((transaction, index) => (
                  <Table.Tr key={index} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <Table.Td style={{ padding: '16px', color: '#868e96', fontSize: '15px' }}>
                      {transaction.sno}
                    </Table.Td>
                    <Table.Td style={{ padding: '16px', color: '#212529', fontSize: '15px' }}>
                      {transaction.transaction}
                    </Table.Td>
                    <Table.Td style={{ padding: '16px', color: '#495057', fontSize: '15px' }}>
                      {transaction.date}
                    </Table.Td>
                    <Table.Td style={{ padding: '16px', color: '#495057', fontSize: '15px' }}>
                      {transaction.reference}
                    </Table.Td>
                    <Table.Td style={{ padding: '16px' }}>
                      {transaction.credit && (
                        <Text size="md" fw={600} c="#2b8a3e">
                          {transaction.credit}
                        </Text>
                      )}
                    </Table.Td>
                    <Table.Td style={{ padding: '16px' }}>
                      {transaction.debit && (
                        <Text size="md" fw={600} c="#2b8a3e">
                          {transaction.debit}
                        </Text>
                      )}
                    </Table.Td>
                    <Table.Td style={{ padding: '16px' }}>
                      <Badge
                        size="lg"
                        radius="md"
                        style={{
                          backgroundColor: '#1864ab',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '14px',
                          padding: '8px 16px',
                          textTransform: 'none',
                        }}
                      >
                        ₹ {transaction.balance}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box> */}
        </Container>

      <Divider mb={"1.5rem"} />
      {/* ================= PROFILE SECTION ================= */}
      <Title order={3} mb={8}>Profile</Title>
      <Box style={{ backgroundColor: '#ffffffff' }}>
        <Container /* style={{ maxWidth: '1600px'}}   */  >
          <Box
            style={{
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {/* First Name and Last Name Row */}
            <Group gap="md" mb="xl" align="flex-start" grow>
              <TextInput
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                styles={{
                  label: {
                    color: '#6c757d',
                    fontSize: '16px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontSize: '16px',
                    padding: '12px 14px',
                    height: '48px',
                    color: '#495057',
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextInput
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                styles={{
                  label: {
                    color: '#6c757d',
                    fontSize: '16px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontSize: '16px',
                    padding: '12px 14px',
                    height: '48px',
                    color: '#495057',
                    backgroundColor: 'white',
                  },
                }}
              />
            </Group>

            {/* Email */}
            <TextInput
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              mb="xl"
              styles={{
                label: {
                  color: '#6c757d',
                  fontSize: '16px',
                  fontWeight: 500,
                  marginBottom: '8px',
                },
                input: {
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  fontSize: '16px',
                  padding: '12px 14px',
                  height: '48px',
                  color: '#495057',
                  backgroundColor: 'white',
                },
              }}
            />

            {/* Phone Number and Register Date Row */}
            <Group gap="md" mb="md" align="flex-start" grow>
              <TextInput
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                styles={{
                  label: {
                    color: '#6c757d',
                    fontSize: '16px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontSize: '16px',
                    padding: '12px 14px',
                    height: '48px',
                    color: '#495057',
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextInput
                label="Register Date"
                value={formData.registerDate}
                onChange={(e) => handleChange('registerDate', e.target.value)}
                styles={{
                  label: {
                    color: '#6c757d',
                    fontSize: '16px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  },
                  input: {
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontSize: '16px',
                    padding: '12px 14px',
                    height: '48px',
                    color: '#495057',
                    backgroundColor: 'white',
                  },
                }}
              />
            </Group>

            {/* Edit Button */}
            <Group justify="flex-end" mt="xl">
              <ActionIcon
                size="xl"
                radius="md"
                style={{
                  backgroundColor: '#1e293b',
                  width: '48px',
                  height: '48px',
                }}
              >
                <IconEdit size={20} color="white" stroke={2} />
              </ActionIcon>
            </Group>
          </Box>
        </Container>
      </Box>
 
      <Divider mt={15} mb={32} />

      {/* ================= BROKERS SECTION ================= */}
      <Flex justify={"space-between"} >
                <Title order={3} mb={8}>Brokers & Exchanges</Title>
                <Button bg={"#000"} >Add Broker</Button>
      </Flex>
      
<Table
              horizontalSpacing="md"
              verticalSpacing="md"
              px={8}
              mt={24}
              style={{
                minWidth: '100%',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Broker Name
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Info
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Action
                  </Table.Th>

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                    <Text size="sm">No Brokers available</Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

      <Divider mb={32} />



      {/* ================= INVOICES SECTION ================= */}
      <Title order={3} mb={8}>Invoices</Title>
      <Table
              horizontalSpacing="md"
              verticalSpacing="md"
              px={8}
              mt={24}
              style={{
                minWidth: '100%',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Invoice
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Date
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Narration
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                    Amount
                  </Table.Th>

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                    <Text size="sm">No Invoice available</Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
      <Divider mb={32} />

      {/* ================= DEMAT ACCOUNT SECTION ================= */}
      <Title order={3} mb={8}>Demat Account</Title>
      <Card mx={12} withBorder radius="md" p="lg" mb={32}>
        
              <Flex align={"center"} justify={"space-between"} >
                <Card px={"2rem"} withBorder style={{alignItems:'center'}} >
                <Image src={dhan} w={"5rem"}  />
                <Text size="0.8rem" >Dhan</Text>
                </Card>

                 <Card px={"2rem"} withBorder style={{alignItems:'center'}} >
                <Image src={zebu} w={"5rem"}  />
                <Text size="0.8rem" >zebu</Text></Card>

                 <Card px={"2rem"} withBorder style={{alignItems:'center'}} >
                <Image src={angelone} w={"5rem"}  />
                <Text size="0.8rem" >angelone</Text></Card>

                 <Card px={"2rem"} withBorder style={{alignItems:'center'}} >
                <Image src={aliceblue} w={"5rem"}  />
                <Text size="0.8rem" >aliceblue</Text></Card>

                 <Card px={"2rem"} withBorder style={{alignItems:'center'}} >
                <Image src={zerodha} w={"5rem"}  />
                <Text size="0.8rem" >zerodha</Text></Card>

              </Flex>
              <Text size="sm" my="md">Open a free Demat account with our supported partners</Text>
      </Card>

      <Divider mb={32} />

      {/* ================= SUPPORT & POLICY SECTION ================= */}
      <Title order={3} mb={8}>Support & Policy</Title>
      <Card withBorder radius="md" p="lg">
        <Flex align={"center"} gap={"0.5rem"} >
          <Text size="sm" mb={6}  >Terms & Conditions</Text>
          <IconArrowNarrowRight size={20} />
        </Flex>
        <Flex align={"center"} gap={"0.5rem"} >
        <Text size="sm" mb={6}>Privacy Policy</Text>
              <IconArrowNarrowRight size={20} />
        </Flex>
        <Flex align={"center"} gap={"0.5rem"} >
        <Text size="sm" mb={6}>Help & Support</Text>
              <IconArrowNarrowRight size={20} />
        </Flex>
        <Group mt="lg">
          <Button style={{ background: "#000", color: "#fff" }}>Contact Support</Button>
        </Group>
      </Card>
    </Box>
  );
}
