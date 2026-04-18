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
import { notifications } from '@mantine/notifications';



export default function Brokers() {
  const [userBroker , setuserBroker] = useState([]);


const BrokerTable = ({ userBroker }) => {
  const [opened, setOpened] = useState(false);
  const [selectedCreds, setSelectedCreds] = useState({});
  const [editMode, setEditMode] = useState(false);
const [editedCreds, setEditedCreds] = useState({});
const [selectedBrokerId, setSelectedBrokerId] = useState(null);

  const handleFlatTradeLogin = (broker) => {
  const { apiKey } = broker.credentials;

  // store broker id (important for callback mapping)
  localStorage.setItem("flattrade_broker_id", broker.id);

  const url = `https://auth.flattrade.in/?app_key=${apiKey}&state=${broker.id}`;

  window.location.href = url;
};

const handleCredChange = (key, value) => {
  setEditedCreds((prev) => ({
    ...prev,
    [key]: value,
  }));
};

const handleUpdateCredentials = async () => {
  try {
    await apiRequest(
      "PATCH",
      `/api/broker/${selectedBrokerId}/credentials`,
      {
        credentials: editedCreds,
      }
    );

    // ✅ update UI instantly
    setuserBroker((prev) =>
      prev.map((b) =>
        b.id === selectedBrokerId
          ? { ...b, credentials: editedCreds }
          : b
      )
    );

    notifications.show({
      title: "Updated",
      message: "Credentials updated successfully",
      color: "green",
    });

    setEditMode(false);
    setSelectedCreds(editedCreds);

  } catch (err) {
    notifications.show({
      title: "Error",
      message: err?.response?.data?.error || "Update failed",
      color: "red",
    });
  }
};

  const handleUpstoxLogin = (broker) => {
  const { apiKey, redirectUri } = broker.credentials;

  // store broker id for callback mapping
  localStorage.setItem("upstox_broker_id", broker.id);

  const url =
    `https://api.upstox.com/v2/login/authorization/dialog` +
    `?response_type=code` +
    `&client_id=${apiKey}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = url;
 };

  const openCredentials = (broker) => {
  setSelectedCreds(broker.credentials || {});
  setEditedCreds(broker.credentials || {});
  setSelectedBrokerId(broker.id);
  setEditMode(false);
  setOpened(true);
};
  
const handleGenerateToken = (broker) => {
  const { appCode } = broker.credentials;

  // store broker id
  localStorage.setItem("alice_broker_id", broker.id);

  // redirect to alice login
  window.location.href = `https://ant.aliceblueonline.com/?appcode=${appCode}`;
};

const deleteBroker = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this broker?");
  if (!confirmDelete) return;

  try {
    await apiRequest('DELETE', `/api/broker/${id}`);

    // ✅ remove from UI instantly
    setuserBroker((prev) => prev.filter((b) => b.id !== id));

    alert("Broker deleted successfully");

  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};
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
    <Stack>
      {Object.entries(editMode ? editedCreds : selectedCreds).map(
        ([key, value]) => (
          <Box key={key}>
            <Text size="xs" c="dimmed">
              {key}
            </Text>

            {editMode ? (
              <TextInput
                value={value}
                onChange={(e) =>
                  handleCredChange(key, e.target.value)
                }
              />
            ) : (
              <Text size="sm">{value}</Text>
            )}
          </Box>
        )
      )}

      <Group justify="space-between" mt="md">
        {!editMode ? (
          <Button
            size="xs"
            bg="#000"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              size="xs"
              color="gray"
              onClick={() => {
                setEditMode(false);
                setEditedCreds(selectedCreds); // reset
              }}
            >
              Cancel
            </Button>

            <Button
              size="xs"
              bg="#000"
              onClick={handleUpdateCredentials}
            >
              Update
            </Button>
          </>
        )}
      </Group>
    </Stack>
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
    color={broker.status === "connected" ? "green" : "red"}
  >
    {broker.status}
  </Badge>

  <br />

  {/* ✅ Show last updated only for specific brokers */}
        {(broker.broker_name === "aliceblue" || broker.broker_name === "upstox" || broker.broker_name === "dhan"|| broker.broker_name === "flattrade") && (
          <Text size="xs" c="dimmed" mt={4}>
            Last updated:{" "}
            {broker.updated_at
              ? new Date(broker.updated_at).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                })
              : "N/A"}
          </Text>
        )}

  {/* Existing buttons */}
        {broker.broker_name === "aliceblue" && (
          <Button
            my="0.5rem"
            radius="0.5rem"
            size="xs"
            bg="#000"
            onClick={() => handleGenerateToken(broker)}
          >
          Generate Token
        </Button>
        )}

        {broker.broker_name === "upstox" && (
        <Button
            my="0.5rem"
            size="xs"
            bg="#000"
            onClick={() => handleUpstoxLogin(broker)}
          >
          Generate Token
        </Button>
        )}

        {broker.broker_name === "flattrade" && (
        <Button
          my="0.5rem"
          size="xs"
          bg="#000"
          onClick={() => handleFlatTradeLogin(broker)}
          >
        Generate Token
        </Button>
          )}
        </Table.Td>

                <Table.Td>
                  {new Date(broker.created_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </Table.Td>

                <Table.Td>
                  <Button
                    size="xs"
                    onClick={() => openCredentials(broker)}
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

    const response = await apiRequest("POST", "/api/broker", payload);

    // ✅ update UI instantly
    setuserBroker((prev) => [...prev, response.broker]);

    notifications.show({
      title: 'Success',
      message: `${selectedBroker} connected successfully`,
      color: 'green'
    });

    setOpened(false);
    setSelectedBroker(null);
    setForm({});

  } catch (err) {
    notifications.show({
      title: 'Error',
      message: err?.response?.data?.error || "Connection failed",
      color: 'red'
    });
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
  onChange={(e) => handleChange("totpSecret", e.target.value)}
/>
          </Stack>
        );
      case "zebumynt":
        return (
          <Stack>
            <TextInput
              label="User ID"
              onChange={(e) => handleChange("uid", e.target.value)}
            />

            <PasswordInput
              label="Password"
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <TextInput
              label="TOTP / 2 factor"
              onChange={(e) => handleChange("factor2", e.target.value)}
            />

            <TextInput
              label="Api key"
              onChange={(e) => handleChange("apiKey", e.target.value)}
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
  label="ACCESS TOKEN"
  onChange={(e) => handleChange("access_token", e.target.value)}
/>

          </Stack>
        );

      case "aliceblue":
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

      <TextInput
        label="App Code"
        onChange={(e) => handleChange("appCode", e.target.value)}
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
      
      case "upstox":
          return (
          <Stack>
        <TextInput
            label="API Key"
            onChange={(e) => handleChange("apiKey", e.target.value)}
          />

          <TextInput
            label="API Secret"
            onChange={(e) => handleChange("apiSecret", e.target.value)}
          />

            <TextInput
          label="Redirect URI"
          onChange={(e) => handleChange("redirectUri", e.target.value)}
        />
        </Stack>
        );
      case "flattrade":
  return (
    <Stack>
      <TextInput
        label="API Key"
        onChange={(e) => handleChange("apiKey", e.target.value)}
      />

      <TextInput
        label="API Secret"
        onChange={(e) => handleChange("apiSecret", e.target.value)}
      />

      <TextInput
        label="Redirect URI"
        onChange={(e) => handleChange("redirectUri", e.target.value)}
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
              "aliceblue",
              "Zerodha",
              "zebumynt",
              "upstox",
              "flattrade"
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