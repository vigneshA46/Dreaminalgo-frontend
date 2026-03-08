import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Select,
  TextInput,
  PasswordInput,
  Group,
  Stack
} from "@mantine/core";

export default function Brokers() {

  const [opened, setOpened] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [brokers, setBrokers] = useState([]);

  const [form, setForm] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {

    const newBroker = {
      name: selectedBroker,
      data: form
    };

    setBrokers([...brokers, newBroker]);

    setOpened(false);
    setSelectedBroker(null);
    setForm({});
  };

  const renderForm = () => {

    switch (selectedBroker) {

      case "Angelone":
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
              label="API Key"
              onChange={(e) => handleChange("apikey", e.target.value)}
            />

            <TextInput
              label="TOTP"
              onChange={(e) => handleChange("totp", e.target.value)}
            />
          </Stack>
        );

      case "Dhan":
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
          </Stack>
        );

      case "Alice Blue":
        return (
          <Stack>
            <TextInput
              label="User ID"
              onChange={(e) => handleChange("userid", e.target.value)}
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

      <Table striped highlightOnHover>

        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Broker Name</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>

      </Table>

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
              "Zerodha"
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