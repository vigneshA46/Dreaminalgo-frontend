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
import { notifications } from "@mantine/notifications";

export default function ChangePassword() {
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
const handleChangePassword = async () => {

  if (loading) return;

  // validation
  if (!password || !confirmPassword) {
    notifications.show({
      title: "Missing fields",
      message: "Please fill all fields",
      color: "red",
    });
    return;
  }

  if (password !== confirmPassword) {
    notifications.show({
      title: "Password mismatch",
      message: "Passwords do not match",
      color: "red",
    });
    return;
  }

  try {
    setLoading(true);

    await apiRequest("POST", "/api/auth/change-password", {
      password,
    });

    notifications.show({
      title: "Password Updated",
      message: "Your password has been changed successfully",
      color: "green",
    });

    // reset fields
    setNewPassword("");
    setConfirmPassword("");

  } catch (err) {
    console.log(err);

    notifications.show({
      title: "Update Failed",
      message: err.message || "Failed to update password",
      color: "red",
    });

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

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />



          <Button
  fullWidth
  loading={loading}
  disabled={loading}
  loaderProps={{ size: "sm" }}
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
}