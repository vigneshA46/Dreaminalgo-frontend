import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Select,
  TextInput,
  PasswordInput,
  Group,
  Stack,
  ScrollArea,
  Badge,
  Accordion,
  Text,
  Box
} from "@mantine/core";
import { apiRequest } from "../utils/api";




export default function Brokers() {
  const [userBroker , setuserBroker] = useState([]);

  const BrokerTable = ({ userBroker }) => {
  const [opened, setOpened] = useState(false);
  const [selectedCreds, setSelectedCreds] = useState({});

  const openCredentials = (creds) => {
    setSelectedCreds(creds || {});
    setOpened(true);
  };
  
    const deleteBroker = async(id) =>{
      try{
        const res = await apiRequest('DELETE',`/api/broker/${id}`)
        console.log(res)
      }catch(err){
        console.log(err)
      }
    }


  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Broker Credentials"
      >
        {Object.keys(selectedCreds).length === 0 ? (
          <Text>No credentials available</Text>
        ) : (
          Object.entries(selectedCreds).map(([key, value]) => (
            <Box key={key} mb={10}>
              <Text size="xs" c="dimmed">
                {key}
              </Text>
              <Text size="sm">{value}</Text>
            </Box>
          ))
        )}
      </Modal>

      <ScrollArea>
        <Table
          highlightOnHover
          withBorder
          miw={600}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Broker</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Credentials</Table.Th>
              <Table.Th>Delete</Table.Th>

            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {userBroker?.map((broker) => (
              <Table.Tr key={broker.id}>
                <Table.Td>
                  <Text fw={500}>{broker.broker_name}</Text>
                </Table.Td>


                <Table.Td>
                  <Badge
                    color={
                      broker.status === "connected" ? "green" : "red"
                    }
                  >
                    {broker.status}
                  </Badge>
                </Table.Td>

                <Table.Td>
                  {new Date(broker.created_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </Table.Td>

                <Table.Td>
                  <Button
                    size="xs"
                    onClick={() =>
                      openCredentials(broker.credentials)
                    }
                    bg={'#000'}
                    radius={'0.3rem'}
                  >
                    View
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    onClick={()=>deleteBroker(broker.id)}
                    bg={'#ff2626'}
                    radius={'0.3rem'}
                  >
                    Delete
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};


  useEffect(()=>{
    const Fetchbroker = async ()=>{
      try{
        const res = await  apiRequest('GET','/api/broker/')
        setuserBroker(res)
        console.log(res)
      }catch(err){
        console.log(err)
      }
    }

    Fetchbroker();
  },[])

  const normalizeBrokerName = (name) => {
  return name.toLowerCase().replace(" ", "");
};

  const [opened, setOpened] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [brokers, setBrokers] = useState([]);

  const [form, setForm] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
  try {

    const payload = {
      brokerName: normalizeBrokerName(selectedBroker),
      credentials: form
    };

    console.log(payload)

    const response = await apiRequest(
      "POST",
      "/api/broker",
      payload
    );

    // ✅ Update UI from backend response
    setBrokers((prev) => [...prev, response.broker]);

    setOpened(false);
    setSelectedBroker(null);
    setForm({});

  } catch (err) {
    console.error(err);
    alert(err?.response?.data?.error || "Connection failed");
  }
};
  const renderForm = () => {

    switch (selectedBroker) {

      case "Angelone":
        return (
          <Stack>
           <TextInput
  label="Client Code"
  onChange={(e) => handleChange("clientCode", e.target.value)}
/>

<PasswordInput
  label="PIN"
  onChange={(e) => handleChange("pin", e.target.value)}
/>

<TextInput
  label="API Key"
  onChange={(e) => handleChange("apiKey", e.target.value)}
/>

<TextInput
  label="TOTP"
  onChange={(e) => handleChange("totp", e.target.value)}
/>
          </Stack>
        );
      case "Zebu":
        return (
          <Stack>
            <TextInput
              label="User ID"
              onChange={(e) => handleChange("userid", e.target.value)}
            />

            <PasswordInput
              label="Password"
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <TextInput
              label="TOTP"
              onChange={(e) => handleChange("totp", e.target.value)}
            />

            <TextInput
              label="Api key"
              onChange={(e) => handleChange("apikey", e.target.value)}
            />
          </Stack>
        );

      case "Dhan":
        return (
          <Stack>
           <TextInput
  label="Client ID"
  onChange={(e) => handleChange("clientId", e.target.value)}
/>

<PasswordInput
  label="PIN"
  onChange={(e) => handleChange("pin", e.target.value)}
/>

<TextInput
  label="TOTP"
  onChange={(e) => handleChange("totp", e.target.value)}
/>
          </Stack>
        );

      case "Alice Blue":
        return (
          <Stack>
           <TextInput
  label="User ID"
  onChange={(e) => handleChange("userId", e.target.value)}
/>

<TextInput
  label="API Key"
  onChange={(e) => handleChange("apiKey", e.target.value)}
/>
          </Stack>
        );

      case "Zerodha":
        return (
          <Stack>
            <TextInput
              label="API Key"
              onChange={(e) => handleChange("apikey", e.target.value)}
            />

            <TextInput
              label="API Secret"
              onChange={(e) => handleChange("apisecret", e.target.value)}
            />

            <TextInput
              label="Token"
              onChange={(e) => handleChange("token", e.target.value)}
            />
          </Stack>
        );

      default:
        return null;
    }
  };

  const rows = brokers.map((broker, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{broker.name}</Table.Td>
      <Table.Td>Connected</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>

      <Group justify="space-between" mb="md">
        <h2>Broker & Exchanges</h2>

        <Button radius={"0.3rem"} bg={"#000"} onClick={() => setOpened(true)}>
          Add Broker
        </Button>
      </Group>

     <BrokerTable userBroker={userBroker} />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Broker"
        size="lg"
      >

        <Stack>

          <Select
            label="Select Broker"
            placeholder="Choose broker"
            data={[
              "Angelone",
              "Dhan",
              "Alice Blue",
              "Zerodha",
              "Zebu"
            ]}
            value={selectedBroker}
            onChange={setSelectedBroker}
          />

          {renderForm()}

          {selectedBroker && (
            <Button bg={"#000"} radius={"0.3rem"} onClick={handleSubmit}>
              Connect Broker
            </Button>
          )}

        </Stack>

      </Modal>

    </div>
  );
}