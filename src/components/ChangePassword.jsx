import { 
  Box, 
  Button, 
  Card, 
  PasswordInput, 
  Stack, 
  Title, 
  Text 
} from "@mantine/core";
import React, { useState } from "react";
import { apiRequest } from "../utils/api";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (!password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await apiRequest("POST", "/api/auth/change-password", {
        password
      });

      setMessage("Password updated successfully");
      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      console.log(err);
      setMessage("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        padding: "1rem"
      }}
    >
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #e5e5e5"
        }}
      >
        <Stack>
          <Title order={3} fw={'500'} ta="center">
            Change Password
          </Title>

          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
          />

          {message && (
            <Text size="sm" c="dimmed" ta="center">
              {message}
            </Text>
          )}

          <Button
            fullWidth
            loading={loading}
            onClick={handleChangePassword}
            style={{
              backgroundColor: "#000",
              color: "#fff"
            }}
          >
            Update Password
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default ChangePassword;